import { Pinecone } from '@pinecone-database/pinecone'
import { convertToASCII } from './utils'
import { getEmbedding } from './embeddings'

export async function getContext (query: string, fileKey: string) {
  console.log('getting the context')
  const queryEmbedding = await getEmbedding(query)
  // console.log('queryEmbedding:', queryEmbedding)
  const matches = await getMatchesFromEmbeddings(queryEmbedding, fileKey)
  // console.log('matches:', matches)

  const qualifyDocs = matches?.filter(match => match.score && match.score > 0.3)
  // console.log('qualifyingdocs:', qualifyDocs)

  type Metadata = {
    text: string
    pageNumber: number
  }

  const docs = qualifyDocs?.map(match => (match.metadata as Metadata).text)
  return docs?.join('\n').substring(0, 3000)
}

export async function getMatchesFromEmbeddings (
  embeddings: number[],
  fileKey: string
) {
  const pinecone = await new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  })

  const pineconeIndex = pinecone.Index('askpdf')
  try {
    const namespace = convertToASCII(fileKey)
    const queryResult = await pineconeIndex.namespace(namespace).query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true
    })

    return queryResult.matches || []
  } catch (error) {
    console.log('error querying embeddings', error)
  }
}
