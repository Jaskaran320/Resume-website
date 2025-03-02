import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const ButtonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "bg-transparent hover:bg-secondary text-foreground",
}

const ButtonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3 text-sm",
  lg: "h-12 px-6 text-lg",
  icon: "h-10 w-10",
}

const Button = forwardRef(
  ({ 
    children, 
    className = "", 
    variant = "default", 
    size = "default", 
    href,
    disabled = false,
    type = "button",
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none"
    
    const variantClass = ButtonVariants[variant] || ButtonVariants.default
    const sizeClass = ButtonSizes[size] || ButtonSizes.default
    
    const classes = `${baseClasses} ${variantClass} ${sizeClass} ${className}`
    
    if (href) {
      if (href.startsWith('http') || href.startsWith('#')) {
        return (
          <a 
            href={href} 
            className={classes} 
            ref={ref}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link to={href} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      )
    }
    
    return (
      <button
        type={type}
        className={classes}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button