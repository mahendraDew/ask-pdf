'use client'

import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FileIcon } from 'lucide-react'

interface PDFDropzoneProps {
  setIsDragActive: (isActive: boolean) => void
}

export default function PDFDropzone({ setIsDragActive }: PDFDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the dropped files here
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  })

  useEffect(() => {
    setIsDragActive(isDragActive);
  }, [isDragActive]);

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
        isDragActive ? 'border-primary' : 'border-muted'
      }`}
    >
      <input {...getInputProps()} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <FileIcon size={48} className="mb-4 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop your PDF here</p>
        ) : (
          <p className="text-lg font-medium">
            Drag & drop your PDF here, or click to select
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Supported file: PDF (max 10MB)
        </p>
      </motion.div>
    </div>
  )
}

