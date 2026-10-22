'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Coffee, Github, CreditCard, DollarSign } from 'lucide-react'

const SponsorSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="sponsor" ref={ref} className="section-shell">
      <div className="content-wrap">
        <motion.div
          className="glass-surface-strong p-8 md:p-10 lg:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-pink-200/35 bg-pink-200/10">
            <Heart className="h-4 w-4 text-pink-300" />
            <span className="text-pink-100 text-sm font-medium">Support My Work</span>
          </motion.div>

          <p className="section-subtitle mb-4">Sponsorship</p>
          <h2 className="section-heading mb-5">Sponsor Me</h2>
          <p className="text-lg text-slate-200/90 mb-10 max-w-3xl mx-auto">
            If my open-source work helps you, sponsorship keeps development sustainable and supports
            more ROM and tooling releases.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <motion.a
              href="https://github.com/sponsors/shield44"
              target="_blank"
              rel="noopener noreferrer"
              className="card-focus group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-white/30 bg-white/6 text-slate-100 hover:bg-white/15"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              Sponsor on GitHub
            </motion.a>

            <motion.a
              href="/phonpe.html"
              target="_blank"
              rel="noopener noreferrer"
              className="card-focus group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-purple-200/40 bg-purple-300/20 text-purple-50 hover:bg-purple-300/30"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <CreditCard size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              PhonePe
            </motion.a>

            <motion.a
              href="/paypal.html"
              target="_blank"
              rel="noopener noreferrer"
              className="card-focus group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-blue-200/40 bg-blue-300/20 text-blue-50 hover:bg-blue-300/30"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <DollarSign size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              PayPal
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              {
                icon: Coffee,
                title: 'Buy me a coffee',
                description: 'Help me stay caffeinated through long debugging and release sessions.',
              },
              {
                icon: Heart,
                title: 'Support development',
                description: 'Enable more time for open-source ROM and tooling work.',
              },
              {
                icon: Github,
                title: 'Open source first',
                description: 'Back practical resources and updates for the wider community.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="glass-surface p-5 h-full card-glow">
                  <Icon className="h-6 w-6 text-cyan-100 mb-3" />
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300/90">{item.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SponsorSection
