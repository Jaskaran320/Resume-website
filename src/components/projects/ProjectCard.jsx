import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import Button from '@/components/common/Button'
import { motion } from 'framer-motion'

const ProjectCard = ({ project }) => {
  const { title, description, image, tags, demoLink, codeLink } = project
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary/10">
              <span className="text-3xl font-bold text-primary/40">{title.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 rounded-md text-xs font-medium bg-primary/20 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        
        <CardFooter className="gap-4">
          {demoLink ? (
            <>
              <Button href={demoLink} size="sm" className="flex-1">
                Live Demo
              </Button>
              {codeLink && (
                <Button href={codeLink} variant="outline" size="sm" className="flex-1">
                  Source Code
                </Button>
              )}
            </>
          ) : (
            codeLink ? (
              <Button href={codeLink} variant="outline" size="sm" className="flex-1">
                Source Code
              </Button>
            ) : (
              <Button disabled variant="outline" size="sm" className="flex-1">
                Releasing Soon
              </Button>
            )
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ProjectCard