import { useState } from 'react'

const ChatLayout = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }])
      setInputText('')
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'This is a bot response.', sender: 'bot' }])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${
              message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[70%]`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatLayout

