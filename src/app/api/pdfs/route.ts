import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/mongo/mongoose'
import PDFModel from '@/model/pdfschema'
import { auth } from '@clerk/nextjs/server'

export async function GET () {
  const {userId} = await auth();
 
  try {
    await connectToDatabase();

    const pdfs = await PDFModel.find({userId: userId}).lean()

    return NextResponse.json(pdfs)
  } catch (error) {
    console.error('Error fetching PDFs:', error)
    return NextResponse.json(
      { message: 'Error fetching PDFs' },
      { status: 500 }
    )
  }
}
