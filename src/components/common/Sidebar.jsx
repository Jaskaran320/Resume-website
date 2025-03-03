import { NavLink } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useEffect } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
)

const ResumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
)

const ThemeIcon = ({ theme }) => (
  theme === 'dark' ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )
)

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [hoverTimeout, setHoverTimeout] = useState(null)

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false)
      setShowContent(false)
      setIsTransitioning(false)
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        setHoverTimeout(null)
      }
    }
  }, [isMobile, hoverTimeout])

  const handleMouseEnter = () => {
    if (isMobile) return

    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    
    if (!isExpanded) {
      setIsExpanded(true)
      setIsTransitioning(true)
      
      setTimeout(() => {
        setShowContent(true)
        setIsTransitioning(false)
      }, 200)
    }
  }

  const handleMouseLeave = () => {
    if (isMobile) return

    if (isExpanded) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true)
        setShowContent(false)

        setTimeout(() => {
          setIsExpanded(false)
          setIsTransitioning(false)
        }, 10)
      }, 200)
      
      setHoverTimeout(timeout)
    }
  }
  
  const navigationItems = [
    { path: '/', label: 'Home', icon: <HomeIcon />},
    { path: '/projects', label: 'Projects', icon: <ProjectsIcon /> },
    { path: '/resume', label: 'Resume Chatbot', icon: <ResumeIcon /> },
    { path: '/blog', label: 'Blog', icon: <BlogIcon /> },
  ]
  
  return (
    <aside 
      className={`sidebar-overlay ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'} ${
        isTransitioning ? 'overflow-hidden' : ''
      } z-20`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Profile section */}
        <div className="p-4 flex items-center justify-center mb-8">
          <div className="rounded-full bg-primary h-10 w-10 min-w-[2.5rem] flex items-center justify-center text-primary-foreground font-bold text-xl">
            JS
          </div>
          {showContent && (
            <span className="ml-3 font-semibold text-lg opacity-animation">
              Jaskaran Singh
            </span>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2 px-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-secondary'
                    }`
                  }
                >
                  <span className="flex-shrink-0">
                    {item.icon}
                  </span>
                  {showContent && (
                    <span className="ml-3 opacity-animation">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Theme toggle only */}
        <div className="mt-auto mb-4">
          <ul className="space-y-2 px-2">
            <li>
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                <span className="flex-shrink-0">
                  <ThemeIcon theme={theme} />
                </span>
                {showContent && (
                  <span className="ml-3 opacity-animation">Change Theme</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar