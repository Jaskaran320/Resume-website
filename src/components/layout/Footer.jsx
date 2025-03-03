import useMediaQuery from "@/hooks/useMediaQuery"

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const isMobile = useMediaQuery('(max-width: 768px)')
    
    return (
      <footer className="border-t border-border bg-card w-full">
        <div className="mx-auto py-4 px-4">
          <div className="flex justify-center flex-col items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Jaskaran Singh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
}

export default Footer