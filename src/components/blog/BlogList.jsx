import { motion } from 'framer-motion'
import BlogCard from './BlogCard'

const BlogList = ({ posts }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </motion.div>
  )
}

export default BlogList