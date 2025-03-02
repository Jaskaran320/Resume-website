import { motion } from 'framer-motion'
import ProjectGrid from '@/components/projects/ProjectGrid'

const Projects = () => {
  return (
    <div className="space-y-8 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">
            A collection of my technical projects and explorations in software development and machine learning.
          </p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProjectGrid />
      </motion.div>
    </div>
  )
}

export default Projects