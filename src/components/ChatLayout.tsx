'use client'
import { useState } from 'react'
import { useChat } from 'ai/react'
import { Loader, Send, StopCircle } from 'lucide-react'
import MessageComponent from './MessageComponent'
import { Spinnaker } from 'next/font/google'

const ChatLayout = () => {
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    stop,
    reload,
    error
  } = useChat({
    api: '/api/chat'
  })

  // const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([])
  // const [inputText, setInputText] = useState('')

  // const handleSendMessage = () => {

  //   if (inputText.trim()) {
  //     setMessages([...messages, { text: inputText, sender: 'user' }])
  //     setInputText('')
  //     // Simulate bot response
  //     setTimeout(() => {
  //       setMessages(prev => [...prev, { text: 'This is a bot response.', sender: 'bot' }])
  //     }, 1000)
  //   }
  // }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // handleSendMessage();
      handleSubmit()
    }
  }

  return (
    <div className='flex flex-col h-full bg-gray-200'>
      <div className='flex-grow overflow-auto p-4'>
        {/* <MessageComponent messages={messages} isLoading={isLoading} stop={stop} reload={reload}/> */}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[90%] md:max-w-[70%]`}
          >
            
            {message.content}
          </div>
        ))}
        {isLoading && (
              <div>
                <Loader className='animate-spin w-4 h-4' />
                {/* <button type='button' onClick={() => stop()}>
                  <StopCircle className='w-4 h-4'/>
                </button> */}
              </div>
            )}

        {error && (
          <>
            <div>An error occurred.</div>
            <button type='button' onClick={() => reload()}>
              Retry
            </button>
          </>
        )}
      </div>
      <div className='p-4 border-t'>
        <form onSubmit={handleSubmit} className='flex'>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className='flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Ask any question'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <Send className='w-4 h-4' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatLayout
