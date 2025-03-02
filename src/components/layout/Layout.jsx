import { useState, useEffect } from 'react'
import Sidebar from '@/components/common/Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useTheme } from '@/contexts/ThemeContext'
import useMediaQuery from '@/hooks/useMediaQuery'

const SIDEBAR_STATE_KEY = 'sidebarCollapsed'

const Layout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY)
    if (isMobile) return true
    return savedState === null ? true : savedState === 'true'
  })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true)
    }
  }, [isMobile])
  
  const toggleSidebar = () => {
    setIsTransitioning(true)
    setSidebarCollapsed(prevState => {
      const newState = !prevState
      localStorage.setItem(SIDEBAR_STATE_KEY, newState.toString())
      return newState
    })
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }
  
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Sidebar 
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isTransitioning={isTransitioning}
      />
      
      <div 
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'content-area-sidebar-collapsed' : 'content-area'
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 page-container">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default Layout