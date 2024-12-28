'use client'

import { Inbox, Loader2, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function UploadPDF () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { mutate } = useMutation({
    mutationFn: async ({
      fileId,
      fileName
    }: {
      fileId: string
      fileName: string
    }) => {
      console.log("creating a chat room")
      console.log("fileId:", fileId)
      console.log("fileName:", fileName)
      const res = await axios.post('/api/create-chat', { fileId, fileName })

      return res.data
    }
  })

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: async acceptedFiles => {
      const file = acceptedFiles[0]
      if (file.size > 5 * 1024 * 1024) {
        //max 5mb
        toast.error('File is too large!')
        return
      }
      //backend hit:
      setLoading(true)
      console.log(acceptedFiles)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await axios.post('/api/upload-pdf', formData)
        const resData = res.data
        console.log('res:', res)
        // if (res.status === 200 || res.statusText === 'OK') {
        //   // fetchPDFs(); // Refresh the list after upload
        //   router.push(`/chats/${resData.fileId}`)
        // }
        if (!resData?.fileId || !resData?.fileName) {
          toast.error('Something went wrong')
          return
        }
        mutate(resData, {
          onSuccess: ({ chat_id }) => {
            toast.success(`Chat created!: ${chat_id}`)
            router.push(`/chats/${resData?.fileId}`)
          },
          onError: err => {
            toast.error('Error Creating chat')
            console.error(err)
          }
        })
      } catch (error) {
        toast.error('Failed to upload!')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className='p-2 w-full bg-white dark:bg-zinc-600 rounded-xl '>
      <div
        {...getRootProps()}
        className={`border-dashed  border-2 rouned-xl cursor-pointer  py-8 flex justify-center items-center flex-col ${
          isDragActive || isFocused
            ? 'bg-gray-100 dark:bg-zinc-600 '
            : 'bg-gray-50 dark:bg-zinc-700'
        }`}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col justify-center items-center group-hover:text-gray-200'>
          {isDragActive ? (
            <>
              <Inbox className='w-16 h-16 text-gray-300 ' />
              <p className='text-gray-300 text-center text-xs sm:text-sm mt-2 '>
                Drop the files here ...
              </p>
            </>
          ) : loading ? (
            <>
              <Loader2 className='w-16 h-16 text-gray-300 animate-spin' />
              <p className='text-gray-300 text-center text-xs sm:text-sm mt-2 '>
                Good things take time...
              </p>
            </>
          ) : (
            <>
              <PlusCircle className='w-16 h-16 text-gray-300 ' />
              <p className='text-gray-300 text-center text-xs sm:text-sm mt-2 '>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            </>
          )}
        </div>
        <div>{status}</div>
      </div>
    </div>
  )
}
