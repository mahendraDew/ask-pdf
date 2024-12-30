import { loadPDFintoPinecone } from '@/lib/pinecone'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

// const hostURL = 'https://askpdfpro.vercel.app';
const hostURL = process.env.HOST;
const client = new PrismaClient()

export async function POST (req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { fileId, fileName } = body

    console.log('fileId:', fileId)
    console.log('fileName:', fileName)

    await loadPDFintoPinecone(fileId)

    const chat_id = await client.chats.create({
      data: {
        fileKey: fileId,
        pdfName: fileName,
        pdfUrl: `${hostURL}/api/pdfs/${fileId}`,
        userId: userId
      },
      select: {
        id: true
      }
    })

    console.log("chatID: ", chat_id)

    return NextResponse.json({
      chat_id: chat_id.id
    }, {status: 200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ msg: 'Internal server error' }, { status: 500 })
  }
}
