import Documents from '@/components/Documents'
import React from 'react'

export default function page() {
  return (
    <div className='w-full max-w-7xl mx-auto '>
        <h1 className='text-2xl p-5 bg-zinc-100 dark:bg-zinc-800 font-extrabold'>
            My Documents
            <Documents />
        </h1>
    </div>
  )
}

