'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 mt-8">
      <div className="content-wrap">
        <div className="glass-surface-strong border border-white/15 py-7 px-6 text-center">
          <motion.div
            className="flex items-center justify-center gap-2 mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-slate-200/90">Made with</span>
            <Heart className="h-4 w-4 text-pink-300" />
            <span className="text-slate-200/90">by</span>
            <span className="text-cyan-100 font-semibold">Thejas KS</span>
          </motion.div>

          <motion.p
            className="text-slate-300/80 text-sm"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} Thejas KS. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
