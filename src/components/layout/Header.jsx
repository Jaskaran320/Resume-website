import { useLocation } from 'react-router-dom'
import githubIcon from "@/assets/github-logo.svg"
import linkedinIcon from "@/assets/linkedin-logo.svg"
import scholarIcon from "@/assets/google-scholar-logo.svg"
import mailIcon from "@/assets/mail-logo.svg"
import useMediaQuery from "@/hooks/useMediaQuery"

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Jaskaran320",
    icon: githubIcon
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/jaskaran-singh7",
    icon: linkedinIcon
  },
  {
    name: "Google Scholar",
    url: "https://scholar.google.com/citations?user=7e2-d74AAAAJ&hl=en",
    icon: scholarIcon
  },
  {
    name: "Email",
    url: "mailto:jaskaransingh.official7@gmail.com",
    icon: mailIcon
  }
]

const getPageTitle = (pathname) => {
  const path = pathname.split('/')[1]
  
  switch (path) {
    case '':
      return 'Home'
    case 'projects':
      return 'Projects'
    case 'resume':
      return 'Resume'
    case 'blog':
      return 'Blog'
    default:
      return 'Portfolio'
  }
}

const Header = () => {
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return (
    <header className="fixed top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300 ease-in-out">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold ml-3 md:ml-0">{pageTitle}</h1>
        </div>
        <div className="flex space-x-8 pr-8">
          {SOCIAL_LINKS.map(link => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.name}
            >
              <img 
                src={link.icon} 
                alt={link.name} 
                width={isMobile ? "16" : "24"} 
                height={isMobile ? "16" : "24"} 
                className="svg-icon"
              />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header