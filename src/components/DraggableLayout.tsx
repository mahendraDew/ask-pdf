// 'use client'

// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import React from 'react'
// import PDFRenderer from './PDFRenderer'
// import ChatComponent from './ChatComponent'

// type ChatProp = {
//   userId: string
//   id: number
//   pdfName: string
//   pdfUrl: string
//   createdAt: Date
//   fileKey: string
// }

// export default function DraggableComponent ({
//   pdfId,
//   chat
// }: {
//   pdfId: string
//   chat: ChatProp
// }) {
//   const router = useRouter()
//   const [dividerPosition, setDividerPosition] = useState(70) // Divider position as a percentage
//   const [document, setDocument] = useState(null)
//   const [error, setError] = useState<string | null>(null)

//   const handleMouseMove = (e: MouseEvent) => {
//     const newDividerPosition = (e.clientX / window.innerWidth) * 100
//     if (newDividerPosition > 10 && newDividerPosition < 90) {
//       setDividerPosition(newDividerPosition)
//     }
//   }

//   const handleMouseUp = () => {
//     window.removeEventListener('mousemove', handleMouseMove)
//     window.removeEventListener('mouseup', handleMouseUp)
//   }

//   const handleMouseDown = () => {
//     window.addEventListener('mousemove', handleMouseMove)
//     window.addEventListener('mouseup', handleMouseUp)
//   }

//   // function isValidObjectId (id: string): boolean {
//   //   return /^[a-f\d]{24}$/i.test(id)
//   // }
//   useEffect(() => {
//     const fetchDocument = async () => {
//       // if (!pdfId) return

//       // if (!isValidObjectId(pdfId)) {
//       //   setError('Invalid ID format')
//       //   // console.error('Invalid ID format');
//       //   router.push('/chats')
//       //   return
//       // }

//       try {
//         const response = await axios.get(`/api/pdfs/${pdfId}`)

//         if (response.status === 200) {
//           setDocument(response.data.document)
//         } else {
//           console.error(`Unexpected response status: ${response.status}`)
//           router.push('/chats')
//         }
//       } catch (err) {
//         console.error('Error fetching document:', err)
//         setError('Error fetching document')
//         // router.push('/chats')
//       }
//     }

//     fetchDocument()
//   }, [pdfId, router, document])

//   if (error) {
//     return <p>Error: {error}</p>
//   }

//   // if (!document) {
//   //   return <p>Loading...</p>;
//   // }

//   return (
//     <div className='flex h-full w-full'>
//       {/* Left Section: PDF Viewer */}
//       <div
//         className='bg-gray-100'
//         style={{ width: `${dividerPosition}%`, overflow: 'auto' }}
//       >
//         <div className='p-4'>
//           <h2 className='text-xl font-semibold'>PDF Viewer</h2>
//           <p>{pdfId}</p>
//           {/* Replace with PDF rendering logic */}
//           <PDFRenderer />
//         </div>
//       </div>

//       {/* Divider */}
//       <div
//         className='w-1 bg-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors duration-300 cursor-col-resize flex justify-center items-center p-[3px]'
//         onMouseDown={handleMouseDown}
//       >
//         <span className='text-4xl'>|</span>
//       </div>

//       {/* Right Section: Chat */}
//       <div
//         className='bg-white'
//         style={{ width: `${100 - dividerPosition}%`, overflow: 'auto' }}
//       >
//         <div className='p-4'>
//           <h2 className='text-xl font-semibold'>Chat Section</h2>
//           <ChatComponent />
//           <p>Chat functionality will go here.</p>
//           {/* Replace with chat rendering logic */}
//         </div>
//       </div>
//     </div>
//   )
// }

// // 'use client'
// // import axios from 'axios'
// // import React, { useEffect, useState } from 'react'

// // export default function DraggableComponent({ pdfId }: { pdfId: string }) {
// //   const [chat, setChat] = useState<any>(null)

// //   useEffect(() => {
// //     const fetchChat = async () => {
// //       try {
// //         const response = await axios.get(`/api/chats/${pdfId}`)
// //         setChat(response.data.chat)
// //       } catch (error) {
// //         console.error('Error fetching chat:', error)
// //       }
// //     }

// //     fetchChat()
// //   }, [pdfId])

// //   return (
// //     <div>
// //       <h1>Chat with PDF: {pdfId}</h1>
// //       {chat ? (
// //         <div>
// //           {/* Display the chat details */}
// //           <div>{chat.pdfName}</div>
// //           <div>{chat.pdfUrl}</div>
// //           <div>{chat.userId}</div>
// //         </div>
// //       ) : (
// //         <div>Loading...</div>
// //       )}
// //     </div>
// //   )
// // }


'use client'

import { useState } from 'react'
import PDFRenderer from '@/components/PDFRenderer'

import ResizableDivider from '@/components/ResizableDivider'
import ChatLayout from './ChatLayout'

type ChatProp = {
    userId: string
    id: number
    pdfName: string
    pdfUrl: string
    createdAt: Date
    fileKey: string
  }


export default function DashboardPage({
  pdfId,
  chat
}: {
  pdfId: string
  chat: ChatProp
}) {
  const [leftWidth, setLeftWidth] = useState(50) // 50% initial width

  const handleResize = (newLeftWidth: number) => {
    const containerWidth = window.innerWidth
    const newLeftWidthPercentage = (newLeftWidth / containerWidth) * 100
    setLeftWidth(newLeftWidthPercentage)
  }

  return (
    <div className="min-h-screen w-full  flex flex-col border p-2">
      <main className="flex-grow flex mt-12 border">
        <div style={{ width: `${leftWidth}%` }} className="h-[calc(100vh-7rem)]">
          <PDFRenderer />
        </div>
        <ResizableDivider onResize={handleResize} />
        <div style={{ width: `${100 - leftWidth}%` }} className="h-[calc(100vh-7rem)]">
          <ChatLayout />
        </div>
      </main>
    </div>
  )
}

