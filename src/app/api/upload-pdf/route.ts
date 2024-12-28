import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongo/mongoose';
import PDFModel from '@/model/pdfschema';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  return NextResponse.json({msg: "this is /upload get reqs"})
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const {userId} = await auth();
  //TODO: Parse the multipart/form-data using multer

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file || file.type !== 'application/pdf') {
    return NextResponse.json({ message: 'Invalid file type. Only PDFs allowed.' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdf = new PDFModel({
      filename: file.name,
      data: buffer,
      contentType: file.type,
      size: file.size,
      userId: userId
    });

    const savedPDF = await pdf.save();
    return NextResponse.json({ message: 'PDF uploaded successfully.', fileId: savedPDF._id, fileName: savedPDF.filename}, {status: 200});
  } catch (error) {
    console.error('Error saving PDF:', error);
    return NextResponse.json({ message: 'Error saving PDF.' }, { status: 500 });
  }
}
