'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

const VideoSection = () => {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoFiles = [
    "videos/anim.mp4",
    "videos/blenderanim.mp4", 
    "videos/donut_animation.mp4",
    "videos/eg1.mp4",
    "videos/Fire.mp4",
    "videos/Graph.mp4",
    "videos/LetterByLetterWithSound.mp4",
    "videos/rac.mp4",
    "videos/RiemannExample.mp4",
    "videos/svg.mp4",
    "videos/Updaters.mp4",
    "videos/slope.mp4",
    "videos/ValueTrackers.mp4"
  ]

  const loadVideo = (index: number) => {
    if (videoRef.current) {
      setCurrentVideoIndex(index)
      videoRef.current.src = videoFiles[index]
      videoRef.current.load()
      if (isPlaying) {
        videoRef.current.play()
      }
    }
  }

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videoFiles.length
    loadVideo(nextIndex)
  }

  const prevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length
    loadVideo(prevIndex)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
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
    }
  }, [currentVideoIndex])

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
      id="videos" 
      ref={ref}
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-black/50 to-gray-900/50"
    >
      <div className="max-w-5xl mx-auto">
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
            🎥 My Manim and Blender Animations
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-8"
            variants={itemVariants}
          />
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Video Player */}
          <motion.div 
            className="relative bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              controls={false}
              autoPlay={false}
              muted={false}
            >
              <source src={videoFiles[currentVideoIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6 w-full">
                <h4 className="text-white text-lg font-semibold mb-2">
                  Animation {currentVideoIndex + 1} of {videoFiles.length}
                </h4>
                <p className="text-gray-300 text-sm">
                  Mathematical visualizations and 3D animations created with Manim and Blender
                </p>
              </div>
            </div>
          </motion.div>

          {/* Video Controls */}
          <motion.div 
            className="flex justify-center items-center gap-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={prevVideo}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/50 text-primary rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-blue-500 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack size={20} />
              Prev
            </motion.button>

            <motion.button
              onClick={togglePlay}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-black rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Play'}
            </motion.button>

            <motion.button
              onClick={nextVideo}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/50 text-primary rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-blue-500 hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <SkipForward size={20} />
            </motion.button>
          </motion.div>

          {/* Video Navigation Dots */}
          <motion.div 
            className="flex justify-center items-center gap-2 mt-6"
            variants={itemVariants}
          >
            {videoFiles.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => loadVideo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          <motion.p 
            className="text-center text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Collection of mathematical visualizations and 3D animations showcasing various concepts 
            in mathematics, physics, and computer graphics. Created using Manim (Mathematical Animation Engine) 
            and Blender for educational and artistic purposes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoSection