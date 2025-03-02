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

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
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

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

const Sidebar = ({ collapsed, toggleSidebar, isTransitioning: parentTransitioning }) => {
  const { theme, toggleTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContent, setShowContent] = useState(!collapsed)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile && !collapsed) {
      toggleSidebar()
    }
  }, [isMobile, collapsed, toggleSidebar])

  useEffect(() => {
    if (collapsed) {
      setIsTransitioning(true)
      setShowContent(false)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setShowContent(true)
        setIsTransitioning(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [collapsed])
  
  const navigationItems = [
    { path: '/', label: 'Home', icon: <HomeIcon />},
    { path: '/projects', label: 'Projects', icon: <ProjectsIcon /> },
    { path: '/resume', label: 'Resume Chatbot', icon: <ResumeIcon /> },
    { path: '/blog', label: 'Blog', icon: <BlogIcon /> },
  ]
  
  return (
    <aside 
      className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} ${
        isTransitioning ? 'overflow-hidden' : ''
      }`}
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
                  <span className={`flex-shrink-0 ${collapsed ? 'tooltip' : ''}`} data-tooltip={item.label}>
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
        
        {/* Theme and Toggle options */}
        <div className="mt-auto">
          <ul className="space-y-2 px-2">
            <li>
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                <span className={`flex-shrink-0 ${collapsed ? 'tooltip' : ''}`} data-tooltip="Change Theme">
                  <ThemeIcon theme={theme} />
                </span>
                {showContent && (
                  <span className="ml-3 opacity-animation">Change Theme</span>
                )}
              </button>
            </li>
          </ul>
          <div className="border-t border-border w-full mt-3 mb-3"></div>
                  
          <ul className="space-y-2 px-2 mb-2">
            <li>
              <button 
                onClick={toggleSidebar}
                className="w-full flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Toggle sidebar"
              >
                <span className={`flex-shrink-0 ${collapsed ? 'tooltip' : ''}`} data-tooltip="Toggle sidebar">
                  <MenuIcon />
                </span>
                {showContent && (
                  <span className="ml-3 opacity-animation">Toggle sidebar</span>
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