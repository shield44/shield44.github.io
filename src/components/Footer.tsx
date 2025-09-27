'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-white/10 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div 
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-gray-300">Made with</span>
          <Heart className="h-4 w-4 text-red-400 animate-pulse" />
          <span className="text-gray-300">by</span>
          <span className="text-primary font-semibold">shield44</span>
        </motion.div>
        
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          &copy; {currentYear} shield44. All rights reserved. Content is protected under copyright law.
        </motion.p>

        <motion.div 
          className="mt-4 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer