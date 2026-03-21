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

// import { GoogleGenerativeAI } from '@google/generative-ai'
// import dotenv from 'dotenv'
// dotenv.config()
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
// const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })

// export async function getEmbedding (text: string) {
//   try {
//     const result = await model.embedContent(text.replace(/\n/g, ''))
//     return result.embedding.values as number[]
//   } catch (error) {
//     console.error('error in embedding!!!', error)
//     throw error
//   }
// }

import { GoogleGenAI } from "@google/genai";
import { RecordValues } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
dotenv.config()
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
// const model = genAI.getGenerativeModel({ model: 'text-embedding-004' })
// const response = await ai.models.embedContent({
//   model: 'gemini-embedding-001',
//   contents: [
//       'What is the meaning of life?',
//       'What is the purpose of existence?',
//       'How do I bake a cake?'
//   ],
// });

export async function getEmbedding (text: string): Promise<RecordValues> {
  try {
    // const result = await model.embedContent(text.replace(/\n/g, ''))
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: text.replace(/\n/g, "")
  });

    // return result.embedding.values as number[]
    //TODO: remove this tsignore
    //@ts-ignore
    // console.log( "new getembeddings: ", response.embeddings[0].values);
    
    // return response.embeddings;
    //TODO: remove this tsignore
    //@ts-ignore
    return response.embeddings[0].values
  } catch (error) {
    console.error('error in embedding!!!', error)
    throw error
  }
}


