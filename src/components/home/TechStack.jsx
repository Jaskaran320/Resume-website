import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { staggerContainer, slideUp } from '@/utils/animation'

const technologies = [
  {
    category: 'Frontend',
    skills: ['JavaScript', 'React.js', 'Solid.js', 'HTML/SCSS', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    skills: ['Python', 'FastAPI', 'Node.js', 'Flask', 'Playwright']
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase']
  },
  {
    category: 'Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'OpenCV']
  },
  {
    category: 'DevOps & Tools',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'AWS']
  },
]

const TechStack = () => {
  const ref = useRef(null)
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])
  
  return (
    <section ref={ref} className="py-0">
      <h2 className="section-title py-1">My Tech Stack</h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8"
        variants={staggerContainer}
        initial="hidden"
        animate={(isInView || hasAnimated) ? "visible" : "hidden"}
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech.category}
            variants={slideUp}
            className="bg-card rounded-lg p-6 shadow-sm border"
          >
            <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
            <ul className="space-y-2">
              {tech.skills.map(skill => (
                <li key={skill} className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default TechStack