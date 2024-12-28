import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPDF extends Document {
  filename: string
  data: Buffer
  contentType: string
  uploadedAt: Date
  size: number
  userId: string
}

const PDFSchema = new Schema<IPDF>({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  size: { type: Number, required: true },
  userId: { type: String, required: true }
})

const PDFModel: Model<IPDF> =
  mongoose.models.PDF || mongoose.model<IPDF>('PDF', PDFSchema)

export default PDFModel
