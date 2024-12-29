import { Message } from 'ai/react'
import React from 'react'

type MsgProps = {
  messages: Message[],
  isLoading: boolean,
  stop: 
}

function MessageComponent ({ messages, isLoading, stop, reload }: { MsgProps }) {
  if (!messages) {
    return <></>
  }
  return (
    <div>
      {JSON.stringify(messages)}
      {/* {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[90%] md:max-w-[70%]`}
          >
           <p> {message.content}
           </p>
          </div>
        ))} */}
    </div>
  )
}

export default MessageComponent
