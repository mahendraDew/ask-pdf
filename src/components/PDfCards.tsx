'use client'

import axios from 'axios'
import { FileText, FileX, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface PDF {
  _id: string
  filename: string
  data: Buffer
  contentType: string
  uploadedAt: Date
  size: number
}

export default function PDfCards () {
  const [pdfs, setPdfs] = useState<PDF[]>([])
  const [loading, setLoading] = useState(false)

  const fetchPDFs = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/pdfs')
      const data = res.data
      // const data: PDF[] = await res.json();
      // console.log('data:', data)
      setPdfs(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching PDFs:', error)
    }
  }

  useEffect(() => {
    fetchPDFs() // Fetch PDFs on initial render
  }, [])
  return (
    <div className=' w-full h-full flex  gap-4 p-5  flex-wrap'>
      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <Loader2 className='animate-spin' />
        </div>
      ) : !pdfs.length ? (
        <div className='text-gray-400 flex flex-col justify-center items-center w-full h-full'>
          <FileX className='w-32 h-32' />
          <span className='text-sm md:text-md'>
            You don&apos;t have any pdfs right now
          </span>
        </div>
      ) : (
        pdfs.map(pdf => (
          <Link key={pdf._id} href={`/chats/${pdf._id}`}>
            <Button className='relative pdf-item w-64 h-80 rounded-lg cursor-pointer bg-gray-200 drop-shadow-md text-gray-400 text-sm md:text-base p-2 flex flex-col justify-between'>
              <p className='w-full text-wrap flex  justify-start items-start text-start'>
                {pdf.filename}
              </p>

              <div className='w-full flex  justify-between items-center text-xs'>
                <p>{new Date(pdf.uploadedAt).toLocaleDateString('en-GB')}</p>
                <p>
                  {pdf.size < 1024 * 1024
                    ? `${Math.round(pdf.size / 1024)} kb`
                    : `${(pdf.size / (1024 * 1024)).toFixed(2)} mb`}
                </p>
              </div>

              <FileText className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
              {/* <Text className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' /> */}
            </Button>
          </Link>
        ))
      )}
    </div>
  )
}
