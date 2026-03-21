import { Pinecone, RecordValues } from '@pinecone-database/pinecone'
import { convertToASCII } from './utils'
import { getEmbedding } from './embeddings'
import { ContentEmbedding } from '@google/genai'

export async function getContext (query: string, fileKey: string) {
  console.log('getting the context')
  console.log('generating query embedding')
  const queryEmbedding = await getEmbedding(query)
  // console.log('queryEmbedding:', queryEmbedding)
  const matches = queryEmbedding
    ? await getMatchesFromEmbeddings(queryEmbedding, fileKey)
    : ''
  // console.log('matches:', matches)
  // console.log('0:', matches?  matches.matches[0].metadata : "matches not found")
  // console.log('1:', matches?  matches.matches[1].metadata : "matches not found")
  // console.log('2:', matches?  matches.matches[2].metadata : "matches not found")


  type Metadata = {
    text: string
    pageNumber: number
  }

  const docs = matches? matches.matches.map(match => (match.metadata as Metadata).text) : [];
  return docs?.join('\n').substring(0, 3000)
}

export async function getMatchesFromEmbeddings (
  queryEmbeddings: RecordValues,
  fileKey: string
) {

  const pc = await new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  })

  // const pineconeIndex = pinecone.Index('askpdf')
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

  try {
    const namespace = convertToASCII(fileKey)
    // const queryResult = await pineconeIndex.namespace(namespace).query({
    //   topK: 5,
    //   vector: querryEmbeddings,
    //   includeMetadata: true
    // })
    // return queryResult.matches || []

    const index = await pc.index({ name: 'askpdf-index' })
    const results = await index
      .namespace(namespace)
      .query({
        vector: queryEmbeddings,
        topK: 3,
        includeValues: true,
        includeMetadata: true
      })
    //   {
    //     topK: 5,
    //     vector: queryEmbeddings,
    //     topK: 5,
    //     includeMetadata: true
    // }
    // console.log('resulttttttttttttttt: ', results)

    return results || []
  } catch (error) {
    console.log('error querying embeddings', error)
  }
}
