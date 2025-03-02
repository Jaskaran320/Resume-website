const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} Jaskaran Singh. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer