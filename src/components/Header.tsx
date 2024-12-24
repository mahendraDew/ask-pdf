'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FileCheck2, FilePlus2, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ModeToggle from './mode-toggle'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full px-1 py-1 flex justify-center items-center z-40'
    >
      <div className='w-full bg-blue-400/20 p-1 mx-auto rounded-lg flex items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='size-8 flex justify-center items-center rounded bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]'>
            <FileCheck2 className='text-white' />
          </div>
        </Link>
        <nav className='hidden md:flex text-gray-600 dark:text-gray-300 items-center space-x-8'>
          
          <div>
            <Link href={'/chats/upload'}><Button variant='outline'>
              <FilePlus2 />
            </Button>
            </Link>
          </div>
          <ModeToggle />
          <div>
            <SignedIn>
            <UserButton />
            </SignedIn>
          </div>
          

        </nav>
        <button
          className='md:hidden size-8 flex items-center justify-center rounded-full bg-white dark:bg-neutral-900 shadow-sm'
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className='size-4 text-gray-800 dark:text-gray-300' />
          ) : (
            <Menu className='size-4 text-gray-800 dark:text-gray-300' />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className='absolute top-full z-10 left-0 right-0 bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden'
          >
            <nav className='flex flex-col justify-center items-center py-4 text-gray-600 dark:text-gray-300 '>
              <ModeToggle />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
