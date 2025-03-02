import { createContext, useState, useContext } from 'react'

const ResumeBotContext = createContext(null)

export const useResumeBot = () => {
  const context = useContext(ResumeBotContext)
  if (!context) {
    throw new Error('useResumeBot must be used within a ResumeBotProvider')
  }
  return context
}

export const ResumeBotProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const sendMessage = (contentOrCallback) => {
    if (typeof contentOrCallback === 'function') {
      setMessages(contentOrCallback)
    } else {
      setMessages(prev => [...prev, contentOrCallback])
    }
  }
  
  const clearMessages = () => {
    setMessages([])
  }
  
  return (
    <ResumeBotContext.Provider value={{ 
      messages, 
      isLoading, 
      setIsLoading,
      sendMessage, 
      clearMessages 
    }}>
      {children}
    </ResumeBotContext.Provider>
  )
}