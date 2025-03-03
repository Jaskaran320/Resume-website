import Sidebar from '@/components/common/Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useTheme } from '@/contexts/ThemeContext'
import useMediaQuery from '@/hooks/useMediaQuery'

const Layout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Sidebar />
      
      {/* Content area */}
      <div className="flex flex-col min-h-screen w-full transition-all duration-300 ease-in-out">
        <Header />
        
        <main className="flex-1 page-container">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default Layout