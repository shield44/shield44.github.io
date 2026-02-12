'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const HeroSection = () => {
  const [animatedText, setAnimatedText] = useState('')
  const fullText = "Hey there, I am Thejas KS AKA shield44"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setAnimatedText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <motion.div 
        className="text-center z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 cyberpunk-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="flex flex-wrap justify-center gap-2">
              {fullText.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block"
                  variants={textVariants}
                  custom={wordIndex}
                >
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      className="inline-block bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent animate-wave"
                      style={{
                        animationDelay: `${(wordIndex * word.length + letterIndex) * 0.1}s`
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        textShadow: "0 0 20px rgba(0, 245, 212, 0.8)"
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  {wordIndex < fullText.split(' ').length - 1 && (
                    <span className="inline-block w-4"></span>
                  )}
                </motion.span>
              ))}
            </motion.div>
          </motion.h1>

          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto max-w-md"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate tech enthusiast, ROM developer, and software engineer
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 premium-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#projects')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </motion.button>
            
            <motion.button
              className="px-8 py-3 glass-morphism-strong border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection