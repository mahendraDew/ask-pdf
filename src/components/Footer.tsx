'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function Footer () {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='w-full px-4 py-8 text-center text-sm text-gray-600'
    >
      <p>
        © askPDF - All rights reserved. Built by{' '}
        <Link
          href='https://x.com/mahendra_Dew'
          className='text-blue-500 hover:underline'
        >
          @mahendra
        </Link>{' '}
        .
      </p>
    </motion.footer>
  )
}
