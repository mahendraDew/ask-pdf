'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PDFDropzone from '@/components/PDFDropzone'
import ModeToggle from '@/components/mode-toggle'
// import  ModeToggle  from '@/compoenents/theme-stolkhoe'

export default function Home() {
  const [isDragActive, setIsDragActive] = useState(false)
  const { theme, setTheme } = useTheme()

  const ThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 right-4"
      >
     <ModeToggle />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4"
      >
        Unlock Your PDFs with AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl text-center text-muted-foreground mb-8 max-w-2xl"
      >
        Chat with your documents using cutting-edge AI technology. Get instant answers and insights from your PDFs.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button size="lg" className="mb-12">
          Start Chatting Now
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-2xl"
      >
        <Card
          className={`p-8 transition-shadow duration-200 ${
            isDragActive ? 'shadow-lg' : ''
          }`}
        >
          <PDFDropzone setIsDragActive={setIsDragActive} />
        </Card>
      </motion.div>
    </div>
  )
}

