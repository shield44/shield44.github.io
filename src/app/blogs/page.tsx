'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VantaBackground from '@/components/VantaBackground'

const blogPosts = [
  {
    title: 'Building My First ROM: Notes From the Trenches',
    excerpt:
      'A practical walkthrough of device trees, vendor blobs, and the hard-won lessons from my first official build.',
    date: '2026-02-12',
    readTime: '6 min read',
    tags: ['Android', 'ROM', 'Build'],
    href: '#',
    status: 'Coming soon'
  },
  {
    title: 'Kernel Tweaks That Actually Matter',
    excerpt:
      'The handful of kernel changes that made a measurable difference for battery and stability.',
    date: '2026-01-28',
    readTime: '4 min read',
    tags: ['Kernel', 'Performance'],
    href: '#',
    status: 'Coming soon'
  },
  {
    title: 'Releasing Builds Without Burning Out',
    excerpt:
      'A lightweight release checklist and cadence that keeps things sustainable.',
    date: '2025-12-18',
    readTime: '5 min read',
    tags: ['Workflow', 'Release'],
    href: '#',
    status: 'Coming soon'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function BlogsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="visual-section visual-section--blogs min-h-screen pt-32 pb-20 px-4">
      <VantaBackground effect="DOTS" color={0x24747a} />
      <div className="max-w-6xl mx-auto relative z-[1]">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p
            className="text-primary uppercase tracking-[0.3em] text-xs md:text-sm mb-4"
            variants={itemVariants}
          >
            Field Notes
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Blogs & Build Logs
          </motion.h1>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto mt-5"
            variants={itemVariants}
          >
            Notes from Android development, machine learning experiments, and building open-source software.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 card-glow group"
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold text-primary group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 border border-primary/30 text-primary text-[11px] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                  {post.status}
                </span>
                {post.href !== '#' ? (
                  <a href={post.href} className="text-sm text-primary hover:text-blue-400 transition-colors duration-300">Read more →</a>
                ) : (
                  <span className="text-xs text-gray-500">In progress</span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 bg-black/40 border border-white/10 rounded-2xl p-8 md:p-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white">
            Want to add a new post?
          </h3>
          <p className="text-gray-300 mt-3">Build notes and technical write-ups are on the way.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300"
            >
              Back to Home
            </Link>
            <a
              href="https://github.com/shield44"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-blue-500 text-black font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </a>
          </div>
        </motion.div>
      </div>
      </section>
      <Footer />
    </main>
  )
}
