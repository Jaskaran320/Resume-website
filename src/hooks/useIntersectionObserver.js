import { useState, useEffect } from 'react'

const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    
    observer.observe(element)
    
    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [ref, options])
  
  return isIntersecting
}

export default useIntersectionObserver