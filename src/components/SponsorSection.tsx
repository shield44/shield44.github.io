'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Coffee, Github, CreditCard, DollarSign } from 'lucide-react'
import Image from 'next/image'

const SponsorSection = () => {
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
      id="sponsor" 
      ref={ref}
      className="min-h-screen relative flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/splash.jpeg"
          alt="Sponsor Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 25, 0],
            y: [0, -25, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="h-5 w-5 text-red-400 animate-pulse" />
            <span className="text-primary text-sm font-medium">Support My Work</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            variants={itemVariants}
          >
            Sponsor Me
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-8"
            variants={itemVariants}
          />
        </motion.div>

        <motion.p 
          className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto"
          variants={itemVariants}
        >
          If you like my work and find my projects helpful, consider sponsoring me to support 
          continued development and creation of open-source content.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          variants={containerVariants}
        >
          <motion.a
            href="https://github.com/sponsors/shield44"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 border border-gray-600"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            Sponsor on GitHub
            <motion.div
              className="h-2 w-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>

          <motion.a
            href="/phonpe.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            PhonePe
            <motion.div
              className="h-2 w-2 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.a>

          <motion.a
            href="/paypal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            PayPal
            <motion.div
              className="h-2 w-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.a>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 card-glow"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Coffee className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Buy me a coffee</h3>
            <p className="text-gray-300 text-sm">
              Help me stay caffeinated during those long coding sessions!
            </p>
          </motion.div>

          <motion.div 
            className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 card-glow"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Support Development</h3>
            <p className="text-gray-300 text-sm">
              Enable me to spend more time on open-source projects and ROM development.
            </p>
          </motion.div>

          <motion.div 
            className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 card-glow"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Github className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Open Source</h3>
            <p className="text-gray-300 text-sm">
              Support the creation of more tools and resources for the community.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Every contribution, no matter how small, helps me continue creating and sharing 
            knowledge with the community. Thank you for your support! 🙏
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default SponsorSection