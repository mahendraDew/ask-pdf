'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function DraggableComponent({ chatId }: { chatId: string }) {
  const [chat, setChat] = useState<any>(null)

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`/api/chats/${chatId}`)
        setChat(response.data.chat)
      } catch (error) {
        console.error('Error fetching chat:', error)
      }
    }

    fetchChat()
  }, [chatId])

  return (
    <div>
      <h1>Chat with PDF: {chatId}</h1>
      {chat ? (
        <div>
          {/* Display the chat details */}
          <div>{chat.pdfName}</div>
          <div>{chat.pdfUrl}</div>
          <div>{chat.userId}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
