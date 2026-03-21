import PDFModel from '@/model/pdfschema'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'

import {
  Document,
  RecursiveCharacterTextSplitter
} from '@pinecone-database/doc-splitter'
import { PineconeRecord, RecordId, RecordMetadata, RecordValues } from '@pinecone-database/pinecone'
import { getEmbedding } from './embeddings'
import md5 from 'md5'
import { getPineconeClient } from './pinecone-config'
import { convertToASCII } from './utils'

type PDFPageProps = {
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
  }
}

//1. fetch the pdf -> download and read from pdf
//2. extract and split text from pdf (-> segments)
//3. vectorize this segments ----> vector embedding
//4. upload the vectors in pinecone
export async function loadPDFintoPinecone (fileId: string) {
  try {
    // 1. Fetch PDF from MongoDB
    console.log('fetching the pdf')
    const pdfBuffer = await fetchPDFFromDB(fileId)
    if (!pdfBuffer) throw new Error('PDF not found')

    //pages:
    const textdata = extractTextFromPDF(pdfBuffer)

    //2. extract and split doc
    console.log('extracting and spliting the doc')
    const documents = await Promise.all(
      (await textdata).map(page => prepareDocument(page))
    )

    //3. vectorize this docs
    console.log('vectorizing the doc')
    const vectors = await Promise.all(
      documents.flat().map(doc => embedDocument(doc))
    )
    // console.log("vectors after flat: ", vectors)
    // console.log("Vector example:", vectors[0])
    // console.log("Values type:", typeof vectors[0])
    // console.log("Values[0]:", vectors[0])
    // console.log("Length:", vectors.length)
    //4 . push this vectors to pinecone db
    const pc = await getPineconeClient()
    // const pineconeIndex = client.Index('askpdf')
    // const pinecodeIndex  = await pc.createIndex({
    //   name: 'askpdf-index',
    //   vectorType: 'dense',
    //   dimension: 3072,
    //   metric: 'cosine',
    //   spec: {
    //     serverless: {
    //       cloud: 'aws',
    //       region: 'us-east-1'
    //     }
    //   },
    //   deletionProtection: 'disabled',
    //   tags: { environment: 'development' }, 
    // });
    const indexes = await pc.listIndexes()
    if (!indexes.indexes?.some(i => i.name === "askpdf-index")) {
      await pc.createIndex({
          name: 'askpdf-index',
          vectorType: 'dense',
          dimension: 3072,
          metric: 'cosine',
          spec: {
            serverless: {
              cloud: 'aws',
              region: 'us-east-1'
            }
          },
          deletionProtection: 'disabled',
          tags: { environment: 'development' }, 
        });
    }
    const pineconeIndex = pc.index({name: "askpdf-index"});
    
    
    console.log('inserting vectors into pinecone')
    const namespace = convertToASCII(fileId)
    // pc.index(indexName).namespace("ns1")
    await pineconeIndex.namespace(namespace).upsert({records: vectors, namespace: namespace})


    // vector inserted
    console.log('vector inserted successfully')
    return "vector inserted successfully";
  } catch (error) {
    console.error('Error processing PDF for Pinecone:', error)
  }
}

//step:1
async function fetchPDFFromDB (id: string): Promise<Buffer | null> {
  const pdfDocument = await PDFModel.findById(id)
  if (!pdfDocument) throw new Error('PDF not found')
  return pdfDocument.data
}

async function extractTextFromPDF (pdfBuffer: Buffer) {
  const blob = new Blob([pdfBuffer], { type: 'application/pdf' })

  const loader = new PDFLoader(blob)
  const pages = (await loader.load()) as PDFPageProps[]

  // return docs.map(doc => doc.pageContent).join(' ');
  return pages
}

// step: 2
//this will take a single page
async function prepareDocument (page: PDFPageProps) {
  let { pageContent } = page
  const { metadata } = page
  pageContent = pageContent.replace(/\n/g, '')
  //spiting the doc
  const splitter = new RecursiveCharacterTextSplitter()
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringBytes(pageContent, 36000)
      }
    })
  ])

  return docs
}

export const truncateStringBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder()
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}

//step 3:
async function embedDocument (doc: Document) {
  try {
    const embeddings = await getEmbedding(doc.pageContent)
    const hash = md5(doc.pageContent)

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber as Number
      } 
    } as unknown as PineconeRecord<RecordMetadata>
    
  } catch (error) {
    console.log('err embedding the doc ', error)
    throw error
  }
}
