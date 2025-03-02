import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useResumeBot } from '@/contexts/ResumeBotContext'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getResumeBotResponse } from '@/services/resumeBot'

const ResumeBot = () => {
  const [message, setMessage] = useState('')
  const { messages, sendMessage, clearMessages } = useResumeBot()
  const chatContainerRef = useRef(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef(null)
  const inputRef = useRef(null)

  const userBubbleStyle = {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))'
  }
  
  const botBubbleStyle = {
    backgroundColor: 'hsl(var(--muted))',
    color: 'hsl(var(--foreground))'
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight
      const height = chatContainerRef.current.clientHeight
      const maxScrollTop = scrollHeight - height
      chatContainerRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.trim() && !isStreaming) {
      await handleSendMessage(message)
      setMessage('')
    }
  }

  const handleSendMessage = async (content) => {
    try {
      setMessage('')
      
      const userMessage = { role: 'user', content }
      sendMessage(userMessage)
      
      setIsStreaming(true)
      
      const assistantMessage = { role: 'assistant', content: '' }
      sendMessage(assistantMessage)
      scrollToBottom()
      
      abortControllerRef.current = new AbortController()
      
      await getResumeBotResponse(
        content, 
        (text, replace = false) => {
          updateLastMessage(text, replace)
          scrollToBottom()
        },
        abortControllerRef.current.signal,
        () => setIsStreaming(false)
      )
    } catch (error) {
      if (error.name !== 'AbortError') {
        updateLastMessage("I'm sorry, I encountered an error processing your request. Please try again later.", true)
      }
      setIsStreaming(false)
    }
  }

  const updateLastMessage = (chunk, replace = false) => {
    sendMessage(prevMessages => {
      const messages = [...prevMessages]
      const lastMessage = messages[messages.length - 1]
      
      if (lastMessage.role === 'assistant') {
        lastMessage.content = replace ? chunk : lastMessage.content + chunk
      }
      
      return messages
    })
  }
  
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.classList.add('smooth-scroll')
    }

    const handleKeyPress = (event) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault()
        inputRef.current.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [messages])

  const messageRecommendations = [
    "What is his tech stack?",
    "What projects did he work on?",
    "How do I contact him?"
  ]

  const placeholder_before_focus = "Press / to focus here"
  const placeholder_after_focus = isStreaming ? "Gemini is responding..." : "Ask something about my resume..."
  const [placeholder, setPlaceholder] = useState(placeholder_before_focus)
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card shadow-sm">
      {/* Header section */}
      <div className="border-b p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 ${isStreaming ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'} rounded-full`}></div>
          <h3 className="font-medium">Resume Bot</h3>
        </div>
        <button 
          onClick={clearMessages} 
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear chat
        </button>
      </div>
      
      {/* Chat messages container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[400px] max-h-[700px]"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
            </svg>
            <p className="max-w-xs">
              Ask me anything about Jaskaran's skills, experience, or qualifications!
            </p>
            
            {/* Message suggestions */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {messageRecommendations.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-3 py-2 bg-secondary/30 rounded-full text-xs hover:bg-secondary transition-colors"
                  disabled={isStreaming}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                style={msg.role === 'user' ? userBubbleStyle : botBubbleStyle}
                className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user' ? 'ml-4' : 'mr-4'}`}
              >
                <div className="markdown whitespace-pre-line">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {msg.content || ' '}
                  </Markdown>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {/* Input form */}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            onFocus={() => setPlaceholder(placeholder_after_focus)}
            onBlur={() => setPlaceholder(placeholder_before_focus)}
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isStreaming}
          />
          {isStreaming ? (
            <button 
              type="button" 
              onClick={handleStopGeneration}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20"></rect>
              </svg>
            </button>
          ) : (
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
              disabled={!message.trim() || isStreaming}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ResumeBot