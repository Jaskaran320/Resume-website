import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import ProjectCard from './ProjectCard'
import Button from '@/components/common/Button'
import { staggerContainer, slideUp } from '@/utils/animation'
import { PROJECTS } from '@/data/projects.js'

const ProjectGrid = ({ limit }) => {
  const [filter, setFilter] = useState('All')
  const displayProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS
  const ref = useRef(null)
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])
  
  const allTags = ['All', ...Array.from(new Set(PROJECTS.flatMap(project => project.tags))).sort()]
  
  const filteredProjects = filter === 'All' 
    ? displayProjects 
    : displayProjects.filter(project => project.tags.includes(filter))
  
  return (
    <div ref={ref} className="space-y-12">
      {!limit && (
        <motion.div 
          className="flex flex-wrap gap-2"
          variants={slideUp}
          initial="hidden"
          animate={(isInView || hasAnimated) ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === tag 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={(isInView || hasAnimated) ? "visible" : "hidden"}
      >
        {filteredProjects.map(project => (
          <motion.div key={project.id} variants={slideUp}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
      
      {limit && filteredProjects.length >= limit && (
        <motion.div 
          className="flex justify-center mt-10"
          variants={slideUp}
          initial="hidden"
          animate={(isInView || hasAnimated) ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          <Button href="/projects" variant="outline" size="lg">
            View All Projects
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectGrid