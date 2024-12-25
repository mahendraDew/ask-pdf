import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/mongo/mongoose'
import PDFModel from '@/model/pdfschema'

export async function GET () {
  try {
    await connectToDatabase()

    const pdfs = await PDFModel.find({}).lean()

    return NextResponse.json(pdfs)
  } catch (error) {
    console.error('Error fetching PDFs:', error)
    return NextResponse.json(
      { message: 'Error fetching PDFs' },
      { status: 500 }
    )
  }
}
