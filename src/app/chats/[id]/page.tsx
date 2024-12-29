// import DraggableComponent from '@/components/DraggableLayout'
// import React from 'react'

// async function page ({ params }: { params: Promise<{ id: string }> }) {
//   const chatId = (await params).id

//   // If the document exists, render the component
//   // return <DraggableComponent chatId={chatId} />
// }

// export default page
import DraggableComponent from '@/components/DraggableLayout'
// import connectToDatabase from '@/lib/db/mongo/mongoose'
// import PDFModel from '@/model/pdfschema'
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

const client = new PrismaClient()

async function page ({ params }: { params: Promise<{ id: string }> }) {
  const pdfId = (await params).id //pdfID
  const { userId } = await auth()

  if (!userId) {
    return redirect('/sign-in')
  }



  const chats = await client.chats.findFirst({ where: { fileKey: pdfId, userId: userId } })

  if (!chats) {
    console.log('no chats so redirect!!!!', chats, '!!!!!userID:', userId)
    console.log('pdfID:', pdfId)
    return redirect('/chats')
  }


  // If the document exists, render the component
  return (
    <div className='w-full h-screen flex justify-center items-center '>
      <div className='flex flex-col w-full h-full justify-center items-center'>
        <DraggableComponent pdfId={pdfId} chat={chats}/>
        
      </div>
    </div>
  )
}

export default page
