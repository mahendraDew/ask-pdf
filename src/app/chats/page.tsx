import Documents from '@/components/Documents'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const { userId } = await auth()
  const {sessionId} = await auth();
  if (!userId || !sessionId) {
    return redirect('/')
  }

  return (
    <div className='w-full max-w-7xl mx-auto '>
        <h1 className='text-2xl p-5 font-extrabold pt-10'>
            <Documents />
        </h1>
    </div>
  )
}

