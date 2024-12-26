import { loadPDFintoPinecone } from '@/lib/pinecone'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  try {
    const body = await req.json()
    const { fileId, fileName } = body

    console.log('fileId:', fileId)
    console.log('fileName:', fileName)

    const pages = await loadPDFintoPinecone(fileId);
    
    
    return NextResponse.json({ pages })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ msg: 'Internal server error' }, { status: 500 })
  }
}
