import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const client = new PrismaClient()

export async function GET (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    console.log("req to pahuch rha hai but")
  const chat_id = (await params).id
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const chat = await client.chats.findFirst({
      where: { id: parseInt(chat_id), userId: userId }
    })

    if (!chat) {
      return NextResponse.json({ msg: 'Chat not found' }, { status: 404 })
    }

    console.log('chat_details: ', chat)

    return NextResponse.json({ chat }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { msg: 'Internal server error, error in getting chat data' },
      { status: 500 }
    )
  }
}
