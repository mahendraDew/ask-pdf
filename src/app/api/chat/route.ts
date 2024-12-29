import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText, streamText } from 'ai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Message } from 'ai/react'

import dotenv from 'dotenv'
dotenv.config()

type MsgProps = {
  messages: Message[]
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function POST (req: Request, res: Response) {
  try {
    const { messages }: MsgProps = await req.json()
    const prompt = messages[messages.length - 1].content

    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const resultGen = await model.generateContent(prompt);

    // const streamingRes = await model.generateContentStream(prompt);

    const stream = await streamText({
      model: google('gemini-1.5-flash'),
      system: `
        You are an AI assistant designed to answer questions strictly based on the content of the given PDF. Your knowledge is limited to the information present in the provided PDF document. 

        Instructions:
        1. If the question is related to the content of the PDF, provide a precise and accurate answer based solely on the information available in the PDF.
        2. If the question is unrelated to the content of the PDF, respond with:
           "I can only answer questions about the content of the PDF. Please ask something relevant to the document."
        3. Avoid providing generic knowledge or opinions. Your responses must always adhere to the context of the provided document.

        Stay concise and focused on the PDF content at all times.
    `,
      messages: messages,
      temperature: 0.7
    })

    return stream?.toDataStreamResponse()
  } catch (error) {
    console.log('error in chat!', error)
  }
}
