'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section 
      id="about" 
      ref={ref}
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-8"
            variants={itemVariants}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              I&apos;m a passionate tech enthusiast with a deep interest in software development,
              open-source projects, and mobile customization. Over the years, I have built and 
              maintained numerous custom ROMs such as Pixel Plus UI, Pixel Experience, DotOS, 
              crDroid, DerpFest, Project Sakura, LineageOS, AOSPA, FluidOS, and many more for 
              devices like the Redmi 8A Dual, Redmi 10C, and others.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              My journey into ROM development began when I successfully converted an Onclite device
              tree to Olivewood, eventually building a working DerpFest ROM for it. Although my first 
              build had a few bugs, the experience fueled my curiosity and dedication. Over time, I 
              officially maintained several ROMs, including Pixel Experience, DotOS, Pixel Extended, 
              and Pixel Plus UI.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              My programming skills span multiple languages, including HTML, CSS, JavaScript, Python,
              C, C++, and Java. I&apos;ve built a variety of projects, such as a Python-based virtual 
              assistant (Jarvis), steganography tools, and JavaScript games like Rock-Paper-Scissors, 
              a Kaboom.js game, classic pool game, and a calculator.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              Beyond coding, I&apos;m always eager to learn emerging technologies, explore new frameworks,
              and push my problem-solving abilities further. I also enjoy watching anime — some of my 
              favorites include Code Geass, Attack on Titan, Dragon Ball Z, Death Note, and Jujutsu Kaisen. 
              In my downtime, I listen to music, especially rap, phonk, and instrumental tracks.
            </motion.p>

            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              Feel free to explore my projects and reach out if you have questions, suggestions, 
              or collaboration ideas. I&apos;m always open to working on innovative and challenging 
              projects with like-minded individuals.
            </motion.p>
          </motion.div>

          {/* GitHub Stats */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.h3 
              className="text-2xl font-bold text-primary mb-6 text-center"
              variants={itemVariants}
            >
              📊 GitHub Stats
            </motion.h3>
            
            <motion.div 
              className="space-y-4 flex flex-col items-center"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://github-readme-stats.vercel.app/api?username=shield44&theme=dark&hide_border=true&include_all_commits=true&count_private=true"
                  alt="GitHub Stats"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </motion.div>
              
              <motion.div 
                className="bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://streak-stats.demolab.com/?user=shield44&theme=dark&hide_border=false"
                  alt="GitHub Streak"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </motion.div>
              
              <motion.div 
                className="bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=shield44&theme=dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact"
                  alt="Top Languages"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
