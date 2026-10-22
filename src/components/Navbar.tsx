'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Clock } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const strTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setCurrentTime(strTime)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#videos', label: 'Videos' },
    { href: '#sponsor', label: 'Sponsor' },
    { href: '#contact', label: 'Contact' },
    { href: '/blogs', label: 'Blogs', external: true },
  ]

  const handleMenuClick = (href: string) => {
    setIsOpen(false)
    if (!href.startsWith('#')) {
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isHashLink = (href: string) => href.startsWith('#')

  return (
    <>
      <motion.div
        className="fixed top-[4.75rem] right-4 z-50 glass-surface px-3 py-2.5 border border-white/20 sm:right-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-cyan-100 neon-glow">
          <Clock size={15} aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm tabular-nums">{currentTime}</span>
        </div>
      </motion.div>

      <motion.nav
        className="fixed top-0 left-0 w-full z-40 border-b border-white/10 bg-slate-950/45 backdrop-blur-xl"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="content-wrap">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => handleMenuClick('#home')}
            >
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                Thejas KS
              </h1>
            </motion.div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1 lg:space-x-2">
                {menuItems.map((item, index) => {
                  const linkClasses =
                    'text-slate-200/90 hover:text-cyan-200 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/5 relative group card-focus'

                  if (isHashLink(item.href)) {
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleMenuClick(item.href)
                        }}
                        className={linkClasses}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 * index }}
                        whileHover={{ scale: 1.03 }}
                      >
                        {item.label}
                      </motion.a>
                    )
                  }

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.08 * index }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <Link href={item.href} className={linkClasses}>
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-100 hover:text-cyan-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-colors duration-200"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 w-full glass-surface-strong border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="content-wrap py-3 space-y-1">
                {menuItems.map((item, index) => {
                  const linkClasses =
                    'text-slate-100 hover:text-cyan-200 hover:bg-white/5 block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 card-focus'

                  if (isHashLink(item.href)) {
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleMenuClick(item.href)
                        }}
                        className={linkClasses}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.06 * index }}
                      >
                        {item.label}
                      </motion.a>
                    )
                  }

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.06 * index }}
                    >
                      <Link href={item.href} className={linkClasses} onClick={() => setIsOpen(false)}>
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
