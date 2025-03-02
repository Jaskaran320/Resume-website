import { useState, useEffect } from 'react'
import Sidebar from '@/components/common/Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useTheme } from '@/contexts/ThemeContext'
import useMediaQuery from '@/hooks/useMediaQuery'

const Layout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    setSidebarCollapsed(isMobile)
  }, [isMobile])
  
  const toggleSidebar = () => {
    setIsTransitioning(true)
    setSidebarCollapsed(!sidebarCollapsed)
    
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