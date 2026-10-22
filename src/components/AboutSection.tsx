'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section id="about" ref={ref} className="section-shell">
      <div className="content-wrap">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle mb-4">Background</p>
          <h2 className="section-heading mb-5">About Me</h2>
          <p className="text-slate-200/85 max-w-3xl mx-auto">
            A quick overview of my ROM development journey, programming interests, and open-source work.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="glass-surface p-6 md:p-8 space-y-5 text-slate-200/90 leading-relaxed">
            <p>
              I&apos;m a passionate tech enthusiast with a deep interest in software development,
              open-source projects, and mobile customization. Over the years, I have built and
              maintained numerous custom ROMs such as Pixel Plus UI, Pixel Experience, DotOS,
              crDroid, DerpFest, Project Sakura, LineageOS, AOSPA, FluidOS, and more.
            </p>

            <p>
              My journey into ROM development began when I converted an Onclite device tree to
              Olivewood and built a working DerpFest ROM. The process sharpened my debugging,
              systems understanding, and release discipline.
            </p>

            <p>
              My programming skills span HTML, CSS, JavaScript, Python, C, C++, and Java. I have
              also built projects such as a Python-based assistant, steganography tools, and
              JavaScript games.
            </p>

            <p>
              Beyond coding, I enjoy exploring emerging technologies, frameworks, and practical
              problem-solving patterns, while staying active in community-driven learning.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-100 text-center lg:text-left">GitHub Stats</h3>

            <div className="glass-surface p-4 card-glow overflow-hidden">
              <Image
                src="https://github-readme-stats.vercel.app/api?username=shield44&theme=dark&hide_border=true&include_all_commits=true&count_private=true"
                alt="GitHub contribution stats"
                width={460}
                height={230}
                className="rounded-lg w-full h-auto"
              />
            </div>

            <div className="glass-surface p-4 card-glow overflow-hidden">
              <Image
                src="https://streak-stats.demolab.com/?user=shield44&theme=dark&hide_border=false"
                alt="GitHub contribution streak"
                width={460}
                height={230}
                className="rounded-lg w-full h-auto"
              />
            </div>

            <div className="glass-surface p-4 card-glow overflow-hidden">
              <Image
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=shield44&theme=dark&hide_border=true&include_all_commits=true&count_private=true&layout=compact"
                alt="Top programming languages"
                width={460}
                height={230}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
