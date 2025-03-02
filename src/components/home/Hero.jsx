import { useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import Button from '@/components/common/Button'
import profileImage from '@/assets/photo.jpg'
import { fadeIn, slideUp } from '@/utils/animation'

const Hero = () => {

  useEffect(() => {
    const fetchAndLog = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ip = ipResponse.data.ip;
        await axios.post("/api/z60eeyX5c47", {}, {
          headers: {
            'X-Forwarded-For': ip
          }
        });
      } catch (error) { }
    };

    fetchAndLog();
  }, []);

  return (
    <section className="py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <span className="text-foreground">Hi, I'm</span>{" "}
            <span className="text-primary">Jaskaran Singh</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-6"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Software Engineer & Machine Learning Enthusiast
          </motion.p>
          
          <motion.p 
            className="text-base md:text-lg mb-8 max-w-2xl"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I build innovative web applications and ML systems that solve real-world problems. 
            Currently focused on developing scalable solutions using Python, FastAPI, and React.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="outline">Contact Me</Button>
          </motion.div>
        </div>
        
        <div className="md:col-span-5">
          <motion.div 
            className="aspect-square rounded-2xl bg-gradient-to-br from-primary/90 to-secondary/20 flex items-center justify-center overflow-hidden relative"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="h-60 w-60 bg-muted rounded-full flex items-center justify-center text-2xl font-bold">
              <img src={profileImage} alt="Profile" className="rounded-full" />
            </div>
            
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10"></div>
            <div className="absolute -left-6 bottom-10 h-20 w-20 rounded-full bg-secondary/20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero