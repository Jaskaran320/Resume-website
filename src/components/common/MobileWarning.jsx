import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useMediaQuery from '@/hooks/useMediaQuery'
import Button from '@/components/common/Button'

const MobileWarning = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [showWarning, setShowWarning] = useState(false)
  
  useEffect(() => {
    const hasBeenDismissed = sessionStorage.getItem('mobileWarningDismissed')
    if (isMobile && !hasBeenDismissed) {
      setShowWarning(true)
    }
  }, [isMobile])
  
  const dismissWarning = () => {
    setShowWarning(false)
    sessionStorage.setItem('mobileWarningDismissed', 'true')
  }
  
  if (!showWarning) return null
  
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-card p-6 rounded-lg shadow-lg max-w-sm w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-4 flex justify-center text-destructive">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12" y2="16"></line>
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Mobile Experience Limited</h3>
        <p className="text-muted-foreground mb-6">
          Unfortunately, this website is not optimized for mobile viewing yet. For the best experience, please open it on a desktop instead.
        </p>
        <Button onClick={dismissWarning}>
          Continue Anyway
        </Button>
      </motion.div>
    </div>
  )
}

export default MobileWarning