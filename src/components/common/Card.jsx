import { forwardRef } from 'react'

const Card = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div 
      className={`bg-card rounded-lg border border-border shadow-sm ${className}`}
      ref={ref} 
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div 
      className={`p-6 pb-2 flex flex-col space-y-1.5 ${className}`}
      ref={ref} 
      {...props}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <h3 
      className={`font-semibold text-lg leading-none tracking-tight ${className}`}
      ref={ref} 
      {...props}
    >
      {children}
    </h3>
  )
})

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <p 
      className={`text-sm text-muted-foreground ${className}`}
      ref={ref} 
      {...props}
    >
      {children}
    </p>
  )
})

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div 
      className={`p-6 pt-0 ${className}`}
      ref={ref} 
      {...props}
    >
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div 
      className={`flex items-center p-6 pt-0 ${className}`}
      ref={ref} 
      {...props}
    >
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }