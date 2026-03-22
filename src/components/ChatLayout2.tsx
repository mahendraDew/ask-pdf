'use client'

import { useChat, UIMessage } from '@ai-sdk/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DefaultChatTransport } from 'ai'
import { Loader, Send } from 'lucide-react'

type Props = {
  pdfId: string
  chatId: number
}

export default function ChatLayout2 ({ chatId, pdfId }: Props) {
  const [loading, setLoading] = useState(true)

  const { data } = useQuery({
    queryKey: ['chatId', chatId],
    queryFn: async () => {
      const response = await axios.post<UIMessage[]>('/api/messages', {
        chatId
      })
      setLoading(false)
      return response.data
    }
  })
  const { messages, sendMessage, status, error, regenerate} = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: {
        pdfId,
        chatId
      }
    })
  })

  // Ref for the message container
  const msgContainerRef = useRef<HTMLDivElement | null>(null)

  // Scroll to the bottom whenever messages are updated
  useLayoutEffect(() => {
    // console.log('messages from fe:', messages)
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTo({
        top: msgContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  //   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
  //       sendMessage({ text: input })
  //     }
  //   }
  const [input, setInput] = useState('')
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='flex flex-col h-full bg-gray-100 dark:bg-neutral-800'>
      {/* Message container */}
      <div
        ref={msgContainerRef}
        className='flex-grow overflow-auto p-4'
        id='msg-container'
      >
        {messages.map(message => (
          <div key={message.id}>
            {/* <div>{`${message.role}: `}</div> */}

            <div
            className={`mb-4 p-2 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-100 dark:bg-blue-500/30 ml-auto'
                : 'bg-white dark:bg-neutral-300/30 '
            } max-w-[90%] md:max-w-[70%]`}
          >
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>
                }

                // if (
                //   part.type === 'file' &&
                //   part.mediaType?.startsWith('image/')
                // ) {
                //   return <img key={index} src={part.url} alt={part.filename} />
                // }

                return null
              })}
            </div>
          </div>
        ))}
         {(status === 'submitted' || status === 'streaming') && (
          <div className='flex items-center space-x-2'>
            <Loader className='animate-spin w-4 h-4' />
          </div>
        )}
         {error && (
          <div className='text-red-500'>
            <div>An error occurred.</div>
            <button
              type='button'
              onClick={() => regenerate()}
              className='text-blue-500 underline'
            >
              Retry
            </button>
          </div>
        )}
      </div>
      <div className='p-4 border-t'>
        <form
          onSubmit={event => {
            event.preventDefault()
            if (input.trim()) {
              sendMessage({
                text: input
              })
              setInput('')
            }
          }}
          className='flex'
        >
          <input
            value={input}
            placeholder='Send message...'
            onChange={e => setInput(e.target.value)}
            disabled={status !== 'ready'}
            className='flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-1.5 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <Send className='w-4 h-4 p-0' />
          </button>
        </form>
      </div>
    </div>
  )
}
