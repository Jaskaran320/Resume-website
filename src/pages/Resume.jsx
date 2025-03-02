import { useState, useRef, useEffect } from 'react'
import PDFViewer from '@/components/resume/PDFViewer'
import ResumeBot from '@/components/resume/ResumeBot'
import { ResumeBotProvider } from '@/contexts/ResumeBotContext'
import { motion } from 'framer-motion'

const Resume = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const sliderRef = useRef(null)
  const isDraggingRef = useRef(false)
  const containerRef = useRef(null)
  
  const resumeWidth = sliderPosition
  const chatWidth = 100 - sliderPosition

  const lowerWidth = 20
  const upperWidth = 80
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !containerRef.current) return
      
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left
      
      let newPosition = (mouseX / containerWidth) * 100
      
      // Limit to range 20-80 to prevent either pane from disappearing completely
      newPosition = Math.max(lowerWidth, Math.min(upperWidth, newPosition))
      
      setSliderPosition(newPosition)
    }
    
    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        document.body.classList.remove('select-none')
      }
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  const handleSliderMouseDown = (e) => {
    isDraggingRef.current = true
    document.body.classList.add('select-none')
    e.preventDefault()
  }
  
  const setLeftPosition = () => setSliderPosition(upperWidth) // Show mostly resume
  const setMiddlePosition = () => setSliderPosition(50) // Equal split
  const setRightPosition = () => setSliderPosition(lowerWidth) // Show mostly chat

  
  return (
    <ResumeBotProvider>
      <div className="space-y-4 pt-6 flex flex-col items-center">
        <div className="flex justify-between items-center w-[95vw] relative" style={{ maxWidth: "1500px" }}>
        <h1 className="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Chat with my Resume!
        </h1>
          
          <div className="ml-auto flex space-x-2">
            <button 
              onClick={setLeftPosition}
              className="p-2 rounded-md hover:bg-secondary"
              aria-label="Show resume"
              title="Show resume"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </button>
            <button 
              onClick={setMiddlePosition}
              className="p-2 rounded-md hover:bg-secondary"
              aria-label="Show both"
              title="Show both"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="8" height="18" rx="1" ry="1"></rect>
                <rect x="13" y="3" width="8" height="18" rx="1" ry="1"></rect>
              </svg>
            </button>
            <button 
              onClick={setRightPosition}
              className="p-2 rounded-md hover:bg-secondary"
              aria-label="Show chat"
              title="Show chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className="flex flex-row h-[85vh] w-[80vw] relative overflow-hidden border rounded-lg shadow-sm border-border"
          style={{ maxWidth: "1800px" }}
        >
          {/* Resume Panel - Left side */}
          <motion.div 
            className="h-full overflow-hidden"
            style={{ width: `${resumeWidth}%` }}
            animate={{ width: `${resumeWidth}%` }}
            transition={{ duration: 0.1 }}
          >
            <PDFViewer />
          </motion.div>
          
          {/* Draggable Slider */}
          <div 
            ref={sliderRef}
            className="absolute top-0 bottom-0 cursor-col-resize flex items-center justify-center z-10"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={handleSliderMouseDown}
          >
            <div className="h-32 w-1.5 bg-primary rounded-full opacity-80 hover:opacity-100 hover:w-2 transition-all" />
          </div>
          
          {/* Chat Panel - Right side */}
          <motion.div 
            className="h-full overflow-hidden"
            style={{ width: `${chatWidth}%` }}
            animate={{ width: `${chatWidth}%` }}
            transition={{ duration: 0.1 }}
          >
            <ResumeBot />
          </motion.div>
        </div>
      </div>
    </ResumeBotProvider>
  )
}

export default Resume