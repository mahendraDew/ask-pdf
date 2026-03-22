// import { Content, GoogleGenAI } from '@google/genai'
import { convertToModelMessages, streamText } from 'ai'
import { google } from '@ai-sdk/google'
// import { GoogleGenerativeAI } from '@google/generative-ai'
import { UIMessage } from '@ai-sdk/react'

import dotenv from 'dotenv'
import { getContext } from '@/lib/context'
import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server'
dotenv.config()
const client = new PrismaClient()

type MsgProps = {
  messages: UIMessage[]
  pdfId: string
  chatId: number
}

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_OPENROUTER! })
// const response = await google.models.embedContent({
//   model: 'gemini-embedding-001',
//   contents: text.replace(/\n/g, "")
// });
// let fullText = ''

export async function POST (req: Request) {
  try {
    const { messages, pdfId, chatId }: MsgProps = await req.json()
    // console.log(messages)

    const lastMessage = messages[messages.length - 1]

    // extract text safely
    const lastUserQuery =
      lastMessage.parts
        ?.filter(part => part.type === 'text')
        .map(part => part.text)
        .join('') || ''

    console.log('last user query:', lastUserQuery)

    const context = await getContext(lastUserQuery, pdfId)
    console.log('got the context... starting to generate!!')
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
    const prompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
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
        AI will not greet or say "welcome" while generating the response. Just start with the gathered or generated(in case) information. 

        USER'S QUESTION
        ${lastUserQuery}
    `
    // const response = await ai.models.generateContentStream({
    //   model: "gemini-3-flash-preview",
    //   contents: prompt,

    // });
    // for await (const chunk of response) {
    //   console.log(chunk.text);
    // }
    // const history = [
    //   ...messages.map(msg => ({
    //     role: msg.role === 'user' ? 'user' : 'model',
    //     parts: [{ text: msg.content }]
    //   }))
    // ]
    // const history = [
    //   ...messages.map(msg => ({
    //     role: msg.role === 'user' ? 'user' : 'model',
    //     parts: [{ text: msg.parts }]
    //   }))
    // ]
    // function toGeminiHistory(messages: UIMessage[]): Content[] {
    //   return messages
    //   .slice(0, -1) // exclude latest user message
    //   .map((msg) => ({
    //     role: msg.role,
    //     parts:
    //       msg.parts
    //         ?.filter(
    //           (part): part is { type: 'text'; text: string } =>
    //             part.type === 'text'
    //         )
    //         .map(part => ({
    //           text: part.text
    //         })) || []
    //   }))
    // }
    // const history = toGeminiHistory(messages);
    // console.log("History : ", history);
    // const chat = await ai.chats.create({
    //   model: 'gemini-3-flash-preview',
    //   history: history
    // })
    // const streamResult = await chat.sendMessageStream({
    //   message: prompt
    // })
    // let fullText = ""

    // for await (const chunk of streamResult) {
    //   const text = chunk.text
    //   if (text) {
    //     fullText += text

    //     // send to frontend

    //   }
    // }
    // console.log("full text: ", fullText)
    // NextResponse.end();

    // console.log("full Text: ", fullText);
    // return NextResponse.json({
    //   "msg": fullText
    // })

    // const result = await streamText({
    //   model: google('gemini-3-flash-preview'),
    //   system: prompt,
    //   // messages: [...messages.filter((msg: UIMessage) => msg.role === 'user')],
    //   temperature: 0.7,
    //   // async onFinish ({ text }) {
    //   //   // implement your own storage logic:
    //   //   console.log("Text: ", text);

    //   //   //store user messaage
    //   //   console.log("inserting user chat")
    //   //   await client.messages.create({
    //   //     data: {
    //   //       content: lastUserQuery,
    //   //       role: 'user',
    //   //       chatId: chatId
    //   //     }
    //   //   })
    //   //   //gemini message => {text}
    //   //   console.log('text: ', text )
    //   //   console.log("inserting Sys chat ")
    //   //   await client.messages.create({
    //   //     data: {
    //   //       content: text,
    //   //       role: 'system',
    //   //       chatId: chatId
    //   //     }
    //   //   })
    //   // }
    // })
    console.log("message ka len:",messages.length)
    const result = streamText({
      // model: google("gemini-3-pro-preview"),
      model: google('gemini-3.1-flash-lite-preview'),
      system: prompt,
      providerOptions: {
        gateway: {
          byok: {
            google: [{ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY }]
          }
        }
      },
      messages: await convertToModelMessages(messages),
      async onFinish ({ text }) {
        // implement your own storage logic:
        console.log('Text answer generated')
        // console.log('Text: ', text)
        //TODO: 
        // make db request/
        console.log("inserting user chat")
        await client.messages.create({
          data: {
            content: lastUserQuery,
            role: 'user',
            chatId: chatId
          }
        })
        //gemini message => {text}
        // console.log('text: ', text )
        console.log("inserting Sys chat ")
        await client.messages.create({
          data: {
            content: text,
            role: 'assistant',
            chatId: chatId
          }
        })
      }
    })
    // console.log('result: ', result)
    return result.toUIMessageStreamResponse()

    // return stream?.toTextStreamResponse()

    // const encoder = new TextEncoder()

    // const stream = new ReadableStream({
    //   async start (controller) {
    //     let fullText = ''

    //     for await (const chunk of streamResult) {
    //       const text = chunk.text
    //       if (text) {
    //         fullText += text
    //         controller.enqueue(encoder.encode(text))
    //       }
    //     }

    //     controller.close()

    //     // save messages
    //     await client.messages.create({
    //       data: {
    //         content: lastUserQuery,
    //         role: 'user',
    //         chatId
    //       }
    //     })

    //     await client.messages.create({
    //       data: {
    //         content: fullText,
    //         role: 'system',
    //         chatId
    //       }
    //     })
    //   }
    // })

    //   const stream = new ReadableStream({
    //     async start(controller) {
    //       // const genAIStream = await chat.sendMessageStream({ message: newMessage });
    //       const streamResult = await chat.sendMessageStream({
    //             message: prompt
    //           })
    //       for await (const chunk of streamResult) {
    //         const text = chunk.text;
    //         console.log("text: ", text)
    //         controller.enqueue(new TextEncoder().encode(text));
    //       }
    //       controller.close();
    //     },
    //   });

    // return new NextResponse(stream, {
    //   headers: { "Content-Type": "text/plain; charset=utf-8" },
    // });
    // const encoder = new TextEncoder()
    // const stream = new ReadableStream({
    //   async start (controller) {
    //     const text = 'This is a streamed response example.'
    //     const words = text.split(' ')
    //     for (const word of words) {
    //       console.log(words)
    //       controller.enqueue(encoder.encode(word + ' '))
    //       await new Promise(r => setTimeout(r, 100)) // Simulate delay
    //     }
    //     controller.close()
    //   }
    // })
    // return new Response(fullText)
  } catch (error) {
    console.log('error in chat!', error)
  }

  // for await (const chunk of stream) {
  //   const text = chunk.text;
  //   NextResponse.rewrite(text? text: "");
  //   // res.write(`data: ${JSON.stringify({ text })}\n\n`);
  // }

  //   (async () => {
  //     try {
  //       for await (const chunk of streamResult) {
  //         const text = chunk.text;
  //         // Send as a simple string or SSE format
  //         await writer.write(encoder.encode(text));
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       await writer.close();
  //     }
  //   })();

  //   // Return the readable side of the stream
  //   return new Response(stream.readable, {
  //     headers: { "Content-Type": "text/plain; charset=utf-8" },
  //   });
  // }

  //  catch (error) {
  //   // res.write(`data: ${JSON.stringify({ error: "Streaming failed" })}\n\n`);
  //     return NextResponse.json( {"error": "Streaming failed"} );
  // }
}
