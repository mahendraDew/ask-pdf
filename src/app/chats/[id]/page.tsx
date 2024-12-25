import DraggableComponent from '@/components/DraggableLayout'
import React from 'react'

async function page ({ params }: { params: Promise<{ id: string }> }) {
  const chatId = (await params).id

  // If the document exists, render the component
  return <DraggableComponent chatId={chatId} />
}

export default page
