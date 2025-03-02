import Hero from '@/components/home/Hero'
import TechStack from '@/components/home/TechStack'
import ProjectGrid from '@/components/projects/ProjectGrid'
import Contact from '@/components/home/Contact'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="space-y-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TechStack />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <section id="projects" className='py-16'>
          <h2 className="section-title py-1 mb-16">Featured Projects</h2>
          <ProjectGrid limit={3} />
        </section>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Contact />
      </motion.div>
    </div>
  )
}

export default Home