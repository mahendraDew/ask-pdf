'use client';
import React, { useRef, useLayoutEffect } from 'react';
import { Message, useChat } from 'ai/react';
import { Loader, MessagesSquare, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  pdfId: string;
  chatId: number;
};

const ChatLayout = ({chatId, pdfId }: Props) => {

  const {data} = useQuery({
    queryKey: ['chatId',chatId ],
    queryFn: async()=> {
      const response = await axios.post<Message[]>('/api/messages', {chatId})

      return response.data
    }
  })
  
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    reload,
    error,
  } = useChat({
    api: '/api/chat',
    body: {
      pdfId,
      chatId,
    },
    initialMessages: data || []
  });

  // Ref for the message container
  const msgContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom whenever messages are updated
  useLayoutEffect(() => {
    console.log("messages from fe:", messages)
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTo({
        top: msgContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Message container */}
      <div
        ref={msgContainerRef}
        className="flex-grow overflow-auto p-4"
        id="msg-container"
      >{!messages.length && (
        <div className="w-full h-full flex flex-col justify-center items-center  text-center text-lg font-semibold">
          <MessagesSquare className="w-12 h-12 text-gray-500 mb-4" />
          <div className='text-gray-400'>Ask Questions to pdf</div>
        </div>
      )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white'
            } max-w-[90%] md:max-w-[70%]`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        <div>

        {/* {messages.map((msg) => <div>{msg.content}</div>)} */}
        </div>
        {isLoading && (
          <div className="flex items-center space-x-2">
            <Loader className="animate-spin w-4 h-4" />
            
          </div>
        )}
        {error && (
          <div className="text-red-500">
            <div>An error occurred.</div>
            <button
              type="button"
              onClick={() => reload()}
              className="text-blue-500 underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Input form */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask any question"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatLayout;
