// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// })

// export async function getEmbedding (text: string) {
//   try {
//     const response = await openai.embeddings.create({
//       model: 'text-embedding-ada-002',
//       input: text.replace(/\n/g, '')
//     })
//     return response.data[0].embedding as number[]
//   } catch (error) {
//     console.error('error calling openai embedding api', error)
//     throw error
//   }
// }

import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })

export async function getEmbedding (text: string) {
  try {
    const result = await model.embedContent(text.replace(/\n/g, ''))
    return result.embedding.values as number[]
  } catch (error) {
    console.error('error calling openai embedding api', error)
    throw error
  }
}


