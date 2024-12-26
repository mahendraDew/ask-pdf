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
    const documents = await Promise.all((await textdata).map(page => prepareDocument(page)))


    //3. vectorize this docs

    
  } catch (error) {
    console.error('Error processing PDF for Pinecone:', error)
  }
}

import mongoose from 'mongoose'
import PDFModel from '@/model/pdfschema'

//step:1
async function fetchPDFFromDB (id: string): Promise<Buffer | null> {
  const pdfDocument = await PDFModel.findById(id)
  if (!pdfDocument) throw new Error('PDF not found')
  return pdfDocument.data
}

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { text } from 'stream/consumers'

async function extractTextFromPDF (pdfBuffer: Buffer) {
  const blob = new Blob([pdfBuffer], { type: 'application/pdf' })

  const loader = new PDFLoader(blob)
  const pages = (await loader.load()) as PDFPageProps[]

  return pages
  // return docs.map(doc => doc.pageContent).join(' ');
}

// step: 2
import {
  Document,
  RecursiveCharacterTextSplitter
} from '@pinecone-database/doc-splitter'

export const truncateStringBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder()
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}

//this will take a single page
async function prepareDocument (page: PDFPageProps) {
  let { pageContent, metadata } = page
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


//step 3:
