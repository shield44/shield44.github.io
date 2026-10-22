'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-8 border-t border-neutral-800 bg-[#111213] px-4 py-8 sm:py-9">
      <div className="content-wrap">
        <motion.div
          className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium tracking-wide text-neutral-300">Thejas KS</p>
          <p className="text-xs text-neutral-500">&copy; {currentYear} Thejas KS. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
