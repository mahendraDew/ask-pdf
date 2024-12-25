'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'

// async function page ({ params }: { params: { id: string } }) {
// const chatId = (await params).id
export default function DraggableComponent ({ chatId }: { chatId: string }) {
  const router = useRouter()
  const [dividerPosition, setDividerPosition] = useState(70) // Divider position as a percentage
  const [document, setDocument] = useState(null)
  const [error, setError] = useState<string | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const newDividerPosition = (e.clientX / window.innerWidth) * 100
    if (newDividerPosition > 10 && newDividerPosition < 90) {
      setDividerPosition(newDividerPosition)
    }
  }

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  function isValidObjectId (id: string): boolean {
    return /^[a-f\d]{24}$/i.test(id)
  }
  useEffect(() => {
    const fetchDocument = async () => {
      if (!chatId) return;

      if (!isValidObjectId(chatId)) {
        setError('Invalid ID format');
        // console.error('Invalid ID format');
        router.push('/chats');
        return;
      }

      try {
        const response = await axios.get(`/api/pdfs/${chatId}`);
        
        if (response.status === 200) {
          setDocument(response.data.document);
        } else {
          console.error(`Unexpected response status: ${response.status}`);
          router.push('/chats');
        }
      } catch (err) {
        console.error('Error fetching document:', err);
        setError('Error fetching document');
        router.push('/chats');
      }
    };

    fetchDocument();
  }, [chatId, router, document]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // if (!document) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className='flex h-screen'>
      {/* Left Section: PDF Viewer */}
      <div
        className='bg-gray-100'
        style={{ width: `${dividerPosition}%`, overflow: 'auto' }}
      >
        <div className='p-4'>
          <h2 className='text-xl font-semibold'>PDF Viewer</h2>
          {/* Replace with PDF rendering logic */}
          <p>{chatId}</p>
        </div>
      </div>

      {/* Divider */}
      <div
        className='w-1 bg-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors duration-300 cursor-col-resize flex justify-center items-center p-[3px]'
        onMouseDown={handleMouseDown}
      >
        <span className='text-4xl'>|</span>
      </div>

      {/* Right Section: Chat */}
      <div
        className='bg-white'
        style={{ width: `${100 - dividerPosition}%`, overflow: 'auto' }}
      >
        <div className='p-4'>
          <h2 className='text-xl font-semibold'>Chat Section</h2>
          <p>Chat functionality will go here.</p>
          {/* Replace with chat rendering logic */}
        </div>
      </div>
    </div>
  )
}
