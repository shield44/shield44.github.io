'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

const VideoSection = () => {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoFiles = [
    'videos/anim.mp4',
    'videos/blenderanim.mp4',
    'videos/donut_animation.mp4',
    'videos/eg1.mp4',
    'videos/Fire.mp4',
    'videos/Graph.mp4',
    'videos/LetterByLetterWithSound.mp4',
    'videos/rac.mp4',
    'videos/RiemannExample.mp4',
    'videos/svg.mp4',
    'videos/Updaters.mp4',
    'videos/slope.mp4',
    'videos/ValueTrackers.mp4',
  ]

  const loadVideo = useCallback(
    (index: number) => {
      if (videoRef.current) {
        setCurrentVideoIndex(index)
        videoRef.current.src = videoFiles[index]
        videoRef.current.load()
        if (isPlaying) {
          void videoRef.current.play()
        }
      }
    },
    [isPlaying, videoFiles]
  )

  const nextVideo = useCallback(() => {
    const nextIndex = (currentVideoIndex + 1) % videoFiles.length
    loadVideo(nextIndex)
  }, [currentVideoIndex, loadVideo, videoFiles.length])

  const prevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length
    loadVideo(prevIndex)
  }

  const togglePlay = async () => {
    if (!videoRef.current) {
      return
    }

    if (isPlaying) {
      videoRef.current.pause()
      return
    }

    try {
      await videoRef.current.play()
    } catch {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      nextVideo()
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [nextVideo])

  return (
    <section id="videos" ref={ref} className="section-shell">
      <div className="content-wrap">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle mb-4">Creative Work</p>
          <h2 className="section-heading mb-5">Manim & Blender Animations</h2>
          <p className="text-slate-200/85 max-w-3xl mx-auto">
            A collection of mathematical visualizations and 3D animation experiments.
          </p>
        </motion.div>

        <motion.div
          className="glass-surface-strong p-4 md:p-6 space-y-6 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <div className="relative rounded-xl overflow-hidden border border-white/20">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              controls={false}
              autoPlay={false}
              muted={false}
              preload="metadata"
            >
              <source src={videoFiles[currentVideoIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm md:text-base text-slate-100 font-medium">
                Animation {currentVideoIndex + 1} of {videoFiles.length}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <motion.button
              onClick={prevVideo}
              className="card-focus flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/25 bg-white/5 hover:bg-white/12 text-cyan-100"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <SkipBack size={18} />
              Prev
            </motion.button>

            <motion.button
              onClick={togglePlay}
              className="card-focus flex items-center gap-2 px-7 py-2.5 rounded-lg bg-gradient-to-r from-cyan-300 to-blue-300 text-slate-950 font-semibold hover:shadow-lg hover:shadow-cyan-300/25"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pause' : 'Play'}
            </motion.button>

            <motion.button
              onClick={nextVideo}
              className="card-focus flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/25 bg-white/5 hover:bg-white/12 text-cyan-100"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Next
              <SkipForward size={18} />
            </motion.button>
          </div>

          <div className="flex justify-center items-center gap-2 flex-wrap">
            {videoFiles.map((_, index) => (
              <button
                key={index}
                onClick={() => loadVideo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex ? 'w-6 bg-cyan-200' : 'w-2.5 bg-slate-400/60 hover:bg-slate-300'
                }`}
                aria-label={`Select video ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoSection
