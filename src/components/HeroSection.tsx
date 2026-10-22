'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const HeroSection = () => {
  const [animatedText, setAnimatedText] = useState('')
  const fullText = 'Hey there, I am Thejas KS'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setAnimatedText(fullText.slice(0, index))
      index += 1
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 70)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="section-shell min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="content-wrap">
        <motion.div
          className="glass-surface-strong p-8 sm:p-10 lg:p-14 text-center border border-white/25"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <motion.p
            className="section-subtitle mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Portfolio
          </motion.p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 bg-clip-text text-transparent">
              {animatedText}
            </span>
          </h1>

          <motion.p
            className="text-lg md:text-2xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Passionate tech enthusiast, ROM developer, and software engineer.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.button
              className="card-focus px-8 py-3 bg-gradient-to-r from-cyan-300 to-blue-300 text-slate-950 font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-300/25 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const element = document.querySelector('#projects')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </motion.button>

            <motion.button
              className="card-focus px-8 py-3 border border-cyan-200/70 text-cyan-100 font-semibold rounded-full hover:bg-cyan-200/10 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
