import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db/mongo/mongoose'
import PDFModel from '@/model/pdfschema'
import mongoose from 'mongoose'

export async function GET (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await connectToDatabase()

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return NextResponse.json({ error: 'Invalid document ID' }, {status:400});
    }
    
    const pdf = await PDFModel.findById(id)


    if (!pdf) {
      return NextResponse.json({ message: 'PDF not found' }, { status: 404 })
    }

    return new NextResponse(pdf.data, {
      headers: {
        'Content-Type': pdf.contentType,
        'Content-Disposition': `inline; filename="${pdf.filename}"`
      }
    })
  } catch (error) {
    console.log('Error fetching PDF:', error)
    return NextResponse.json({ message: 'Error fetching PDF' , error}, { status: 500 })
  }
}
