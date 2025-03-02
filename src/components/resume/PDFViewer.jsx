import { useState, useEffect, useMemo, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion } from 'framer-motion'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const RESUME_URL = "https://firebasestorage.googleapis.com/v0/b/resume-website-457ee.appspot.com/o/Jaskaran_Resume.pdf?alt=media"
const CACHE_DURATION_MS = 1 * 3600 * 1000 // 1 hour
const CACHE_KEY_DATA = 'cachedResumeData'
const CACHE_KEY_TIMESTAMP = 'cachedResumeTimestamp'
const MIN_ZOOM = 0.6
const MAX_ZOOM = 2.0
const DEFAULT_SCALE = 0.9
const FILENAME = 'Jaskaran_Resume.pdf'

const PDFViewer = () => {
  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [zoomInput, setZoomInput] = useState("90")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pdfDataUrl, setPdfDataUrl] = useState(null)

  // Load PDF data either from cache or network
  useEffect(() => {
    const loadPdfData = async () => {
      try {
        setIsLoading(true)
        
        const cachedPdf = localStorage.getItem(CACHE_KEY_DATA)
        const cachedTimestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP)
        const currentTime = Date.now()
        
        if (cachedPdf && cachedTimestamp && (currentTime - parseInt(cachedTimestamp, 10)) < CACHE_DURATION_MS) {
          setPdfDataUrl(`data:application/pdf;base64,${cachedPdf}`)
          setIsLoading(false)
          return
        }
        
        const response = await fetch(RESUME_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch PDF')
        }
        
        const blob = await response.blob()
        
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1]
          
          localStorage.setItem(CACHE_KEY_DATA, base64String)
          localStorage.setItem(CACHE_KEY_TIMESTAMP, currentTime.toString())
          
          setPdfDataUrl(`data:application/pdf;base64,${base64String}`)
          setIsLoading(false)
        }
        reader.readAsDataURL(blob)
        
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }
    
    loadPdfData()
  }, [])

  // Memoize the file prop to avoid unnecessary reloads
  const pdfFile = useMemo(() => {
    return pdfDataUrl ? { url: pdfDataUrl } : null
  }, [pdfDataUrl])
  
  const handleDocumentLoadSuccess = useCallback(() => {
    setError(null)
  }, [])

  const handleDocumentLoadError = useCallback((err) => {
    setError(err)
  }, [])
  
  const zoomIn = useCallback(() => {
    setScale(prevScale => {
      const newScale = Math.min(prevScale + 0.1, MAX_ZOOM)
      setZoomInput(Math.round(newScale * 100).toString())
      return newScale
    })
  }, [])
  
  const zoomOut = useCallback(() => {
    setScale(prevScale => {
      const newScale = Math.max(prevScale - 0.1, MIN_ZOOM)
      setZoomInput(Math.round(newScale * 100).toString())
      return newScale
    })
  }, [])

  const handleZoomInputChange = useCallback((e) => {
    const value = e.target.value.replace(/[^\d]/g, '')
    setZoomInput(value)
  }, [])

  const handleZoomInputBlur = useCallback(() => {
    let numValue = parseInt(zoomInput, 10)
    
    if (isNaN(numValue) || numValue < MIN_ZOOM * 100) {
      numValue = MIN_ZOOM * 100
    } else if (numValue > MAX_ZOOM * 100) {
      numValue = MAX_ZOOM * 100
    }
    
    setZoomInput(numValue.toString())
    setScale(numValue / 100)
  }, [zoomInput])

  const handleZoomInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }, [])

  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY_DATA)
    localStorage.removeItem(CACHE_KEY_TIMESTAMP)
    window.location.reload()
  }, [])

  const downloadResume = useCallback(() => {
    if (pdfDataUrl) {
      const link = document.createElement('a')
      link.href = pdfDataUrl
      link.download = FILENAME
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // Fallback to direct download from URL
    fetch(RESUME_URL)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.href = url
        link.download = FILENAME
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
      .catch(error => console.error('Error downloading the PDF:', error))
  }, [pdfDataUrl])
  
  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-card border rounded-lg overflow-hidden shadow-sm h-full">
        <div className="flex justify-between items-center p-3 border-b">
          <div className="flex space-x-2">
            <button
              onClick={zoomOut}
              disabled={scale <= MIN_ZOOM}
              className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-50"
              aria-label="Zoom out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            
            <button
              onClick={zoomIn}
              disabled={scale >= MAX_ZOOM}
              className="p-1.5 rounded-md hover:bg-secondary disabled:opacity-50"
              aria-label="Zoom in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>

            <div className="flex items-center">
              <input
                type="text"
                value={zoomInput}
                onChange={handleZoomInputChange}
                onBlur={handleZoomInputBlur}
                onKeyDown={handleZoomInputKeyDown}
                className="w-12 text-center p-1 rounded-md border bg-background"
                aria-label="Zoom percentage"
              />
              <span className="ml-1 text-sm">%</span>
            </div>
          </div>
          
          <button
            onClick={downloadResume}
            className="flex items-center space-x-1 p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            aria-label="Download resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span className="text-sm font-medium">Download</span>
          </button>
        </div>
        
        <div className="p-4 overflow-auto bg-secondary/30 h-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Document
              file={pdfFile}
              onLoadSuccess={handleDocumentLoadSuccess}
              onLoadError={handleDocumentLoadError}
              loading={
                <div className="flex items-center justify-center h-full min-h-[60vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
                  <p className="text-destructive mb-2">Failed to load PDF.</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {error ? `Error: ${error.message}` : "Please check that the file exists at the correct path."}
                  </p>
                  <button 
                    onClick={clearCache} 
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm"
                  >
                    Retry
                  </button>
                </div>
              }
              className="shadow-lg"
            >
              <div className="min-w-full overflow-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-auto"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Page
                    pageNumber={1}
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </motion.div>
              </div>
            </Document>
          )}
        </div>
      </div>
    </div>
  )
}

export default PDFViewer