'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FileCheck2, Menu, Sun, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ModeToggle from './mode-toggle'
import { useTheme } from 'next-themes'

export function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const ThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full px-4 py-4 flex justify-center items-center'
    >
      <div className='relative max-w-5xl bg-blue-500/10 p-3  rounded-lg w-full'>
        <div className='absolute top-2 left-2 size-1 bg-blue-500/40 rounded-full' />
        <div className='absolute top-2 right-2 size-1 bg-blue-500/40 rounded-full' />
        <div className='absolute bottom-2 left-2 size-1 bg-blue-500/40 rounded-full' />
        <div className='absolute bottom-2 right-2 size-1 bg-blue-500/40 rounded-full' />

        <div className='max-w-5xl bg-white dark:bg-zinc-900 p-1 mx-auto rounded-lg flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <div className='size-8 flex justify-center items-center rounded bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]' >
            <FileCheck2 />
            </div>
          </Link>
          <nav className='hidden md:flex text-gray-600 dark:text-gray-300 items-center space-x-8'>
            {/* <Link
              href='#'
              className='text-sm  hover:text-gray-900 dark:hover:text-gray-50 '
            >
              Updates
            </Link>
            <Link
              href='#'
              className='text-sm  hover:text-gray-900  dark:hover:text-gray-50'
            >
              FAQ
            </Link>
            <Link
              href='#'
              className='text-sm  hover:text-gray-900  dark:hover:text-gray-50'
            >
              Contact us
            </Link> */}
            {/* <button className='size-8 flex items-center justify-center rounded-full bg-white shadow-sm'> */}
            <ModeToggle />

            {/* </button> */}
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
              {/* <Link
                href='#'
                className='px-4 py-2 text-sm  hover:bg-gray-100'
              >
                Updates
              </Link>
              <Link
                href='#'
                className='px-4 py-2 text-sm  hover:bg-gray-100'
              >
                FAQ
              </Link>
              <Link
                href='#'
                className='px-4 py-2 text-sm  hover:bg-gray-100'
              >
                Contact us
              </Link> */}
             <ModeToggle />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

    </motion.header>
  )
}
