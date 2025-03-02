import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from '@/App'
import { ThemeProvider } from '@/contexts/ThemeContext'
import '@/styles/globals.css'
import '@/styles/themes.css'
import '@/styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)