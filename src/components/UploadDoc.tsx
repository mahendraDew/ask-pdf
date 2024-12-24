'use client'

import { Inbox, PlusCircle } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadPDF () {
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    accept: {'application/pdf': ['.pdf']},
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
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
      </div>
    </div>
  )
}
