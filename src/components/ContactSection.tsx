'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Send, User, MessageSquare, Github, Youtube, Gitlab, ExternalLink } from 'lucide-react'

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const socialLinks = [
    { href: "https://github.com/shield44", label: "GitHub", icon: Github, color: "hover:text-gray-400" },
    { href: "https://youtube.com/@shield44-k90", label: "YouTube", icon: Youtube, color: "hover:text-red-400" },
    { href: "mailto:ksthejas060@gmail.com", label: "Gmail", icon: Mail, color: "hover:text-yellow-400" },
    { href: "https://gitlab.com/shield44", label: "GitLab", icon: Gitlab, color: "hover:text-orange-400" },
    { href: "https://sourceforge.net/u/shield44", label: "SourceForge", icon: ExternalLink, color: "hover:text-green-400" },
    { href: "https://t.me/shield44", label: "Telegram", icon: ExternalLink, color: "hover:text-blue-400" }
  ]

  return (
    <section 
      id="contact" 
      ref={ref}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-8"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-8"
            variants={itemVariants}
          />
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            What&apos;s next! Let&apos;s work together on something amazing.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Contact Form */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl font-bold text-primary mb-6"
              variants={itemVariants}
            >
              Send Message
            </motion.h3>
            
            <form onSubmit={handleSubmit} action="https://formspree.io/f/xldjelqg" method="POST" className="space-y-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={itemVariants}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                  />
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/50 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                  />
                </div>
              </motion.div>
              
              <motion.div className="relative" variants={itemVariants}>
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black/50 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300"
                />
              </motion.div>
              
              <motion.div className="relative" variants={itemVariants}>
                <textarea
                  name="message"
                  placeholder="Your message *"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300 resize-none"
                />
              </motion.div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-500 text-black font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <Send size={20} />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl font-bold text-primary mb-6"
              variants={itemVariants}
            >
              Find Me Online
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-primary/50 transition-all duration-300 card-glow group ${link.color}`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                )
              })}
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 mt-8"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-primary mb-4">Let&apos;s Collaborate!</h4>
              <p className="text-gray-300 leading-relaxed">
                I&apos;m always interested in working on innovative projects with like-minded individuals. 
                Whether you have a cool idea, need help with ROM development, or just want to chat about 
                tech, feel free to reach out!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection