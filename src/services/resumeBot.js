import { GoogleGenerativeAI } from '@google/generative-ai'
import { RESUME_DATA } from '@/data/resume-data'

const API_KEY = import.meta.env.VITE_GEM
const genAI = new GoogleGenerativeAI(API_KEY)
const TYPING_SPEED = 10

const SYSTEM_PROMPT = `You are an AI assistant that will ONLY answer questions pertaining to Jaskaran Singh. 
Use the following information (Jaskaran Singh's Resume) to answer the user's questions:

${RESUME_DATA}

Return Markdown format with proper hyperlinks. Bold important information. Give proper spacing and formatting.
DO NOT answer any questions or perform any tasks not related to Jaskaran Singh's Resume.
Answer everything that you can with all the information provided as per the questions asked and provide appropriate spacing.
If the user talks normally, you can converse normally as well.
Make sure that your language is professional and grammatically correct.
Be concise and do not overstate Jaskaran Singh's achievements or accomplishments. Try to be as helpful as possible but do not state any false information.
If the answer is not in the context, say the word "Unknown".`

export const getResumeBotResponse = async (message, onChunk, signal, onComplete) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "I'll help answer questions about Jaskaran Singh based on his resume information." }] }
      ],
    })

    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError")
    }

    const result = await chat.sendMessage(message, { abortSignal: signal })
    const response = result.response
    const fullResponse = response.text()

    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError")
    }

    await simulateTypingEffect(fullResponse, onChunk, signal)

    if (onComplete && !signal.aborted) {
      onComplete()
    }

    return fullResponse
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Response generation was aborted')
    } else {
      console.error('Error calling Gemini API:', error)
    }
    throw error
  }
}

const simulateTypingEffect = (text, onChunk, signal) => {
  return new Promise((resolve, reject) => {
    let index = 0
    let currentText = ""
    let typingInterval = null

    onChunk("", true)
    
    const typeCharacter = () => {
      if (signal.aborted) {
        clearTimeout(typingInterval)
        reject(new DOMException("Aborted", "AbortError"))
        return
      }
      
      if (index < text.length) {
        const char = text.charAt(index)
        currentText += char
        
        onChunk(currentText, true)
        
        index++
        typingInterval = setTimeout(typeCharacter, TYPING_SPEED)
      } else {
        resolve()
      }
    }
    
    typeCharacter()
  })
}