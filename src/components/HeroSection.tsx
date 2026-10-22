'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import UltraHDRBackground from './UltraHDRBackground'

const HeroSection = () => {
  return (
    <section id="home" className="hero-showroom relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <UltraHDRBackground />
      <div className="hero-showroom__shade" />
      <div className="content-wrap relative z-10 w-full">
        <motion.div
          className="hero-showroom__content py-10 sm:py-16 lg:py-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <h1 className="hero-title max-w-4xl text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.98]">
            <span className="text-white">Hey there, I&apos;m Thejas KS.</span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-slate-200/90 max-w-xl leading-relaxed mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            I&apos;m a second-year B.E. Computer Science student at RV College of Engineering,
            exploring software, AI, and open-source projects.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 items-start mt-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.button
              className="hero-action hero-action--primary card-focus"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const element = document.querySelector('#projects')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore projects <ArrowDown size={16} />
            </motion.button>

            <motion.button
              className="hero-action hero-action--quiet card-focus"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get in touch <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-showroom__caption" aria-hidden="true"><span>FIG. 01</span><span>AN INTERACTIVE PORTFOLIO</span></div>
    </section>
  )
}

export default HeroSection
