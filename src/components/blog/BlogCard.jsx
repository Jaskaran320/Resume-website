import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card'
import Button from '@/components/common/Button'

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const BlogCard = ({ post }) => {
  const { title, excerpt, date, coverImage, tags } = post
  
  const postUrl = `/blog/${post.id}`
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div variants={item} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden">
        {coverImage ? (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={coverImage} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary/40 text-2xl font-bold">Blog Post</span>
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <CardDescription className="line-clamp-3">
            {excerpt}
          </CardDescription>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button href={postUrl} variant="outline" size="sm" className="w-full">
            Read More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default BlogCard