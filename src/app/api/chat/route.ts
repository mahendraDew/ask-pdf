import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
// import { GoogleGenerativeAI } from '@google/generative-ai'
import { Message } from 'ai/react'

import dotenv from 'dotenv'
import { getContext } from '@/lib/context'
import { PrismaClient } from '@prisma/client'
dotenv.config()
const client = new PrismaClient()

type MsgProps = {
  messages: Message[]
  pdfId: string
  chatId: number
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function POST (req: Request) {
  try {
    const { messages, pdfId, chatId }: MsgProps = await req.json()
    const lastUserQuery = messages[messages.length - 1].content

    const context = await getContext(lastUserQuery, pdfId)

    // console.log("context:", context);
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const resultGen = await model.generateContent(prompt);

    // const streamingRes = await model.generateContentStream(prompt);

    // const prompt: Message = {
    //   id:'system',
    //   role: 'system',
    //   content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
    //     The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    //     AI is a well-behaved and well-mannered individual.
    //     AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
    //     AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in
    //     AI assistant is a big fan of Pinecone and Vercel.

    //     START CONTEXT BLOCK
    //     ${context}
    //     END OF CONTEXT BLOCK

    //     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    //     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer."
    //     AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
    //     AI assistant will not invent anything that is not drawn directly from the context.
    // `
    // }

    const stream = await streamText({
      model: google('gemini-1.5-flash'),
      system: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in 
        AI assistant is a big fan of Pinecone and Vercel.

        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK

        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer."
        AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
    `,
      messages: [...messages.filter((msg: Message) => msg.role === 'user')],
      temperature: 0.7,
      async onFinish ({ text }) {
        // implement your own storage logic:

        //store user messaage
        console.log("inserting user chat")
        await client.messages.create({
          data: {
            content: lastUserQuery,
            role: 'user',
            chatId: chatId
          }
        })
        //gemini message => {text}
        console.log('text: ', text )
        console.log("inserting Sys chat ")
        await client.messages.create({
          data: {
            content: text,
            role: 'system',
            chatId: chatId
          }
        })
      }
    })

    return stream?.toDataStreamResponse()
  } catch (error) {
    console.log('error in chat!', error)
  }
}
