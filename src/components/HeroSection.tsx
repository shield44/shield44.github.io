'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import VantaNetBackground from './VantaNetBackground'

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
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <VantaNetBackground />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,15,18,0.96)_0%,rgba(8,15,18,0.78)_48%,rgba(8,15,18,0.3)_100%)]" />
      <div className="content-wrap relative">
        <motion.div
          className="max-w-5xl py-10 sm:py-16 lg:py-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <motion.p
            className="section-subtitle mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            RVCE / CSE / Open source
          </motion.p>

          <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.98]">
            <span className="text-stone-100">
              {animatedText}
            </span>
          </h1>

          <motion.p
            className="text-lg md:text-2xl text-slate-200/90 max-w-3xl mx-auto leading-relaxed mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            I&apos;m a second-year Computer Science Engineering student at RVCE, building useful things
            around Android, open source, and the systems underneath the screen.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-start mt-10"
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
