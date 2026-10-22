'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const StartupLoader = () => {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(8)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const step = window.setInterval(() => setProgress((current) => Math.min(100, current + 7 + Math.floor(Math.random() * 13))), 100)
    const dismiss = window.setTimeout(() => setVisible(false), reduceMotion ? 650 : 2100)
    return () => {
      window.clearInterval(step)
      window.clearTimeout(dismiss)
    }
  }, [reduceMotion])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') setVisible(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="startup-loader"
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.45 } }}
        >
          <div className="startup-loader__scanline" />
          <div className="startup-loader__terminal">
            <div className="startup-loader__topline">
              <span>THEJAS.OS 26.10 · TTY1</span>
              <span>GPU WEBGL OK · PORTFOLIO.EXE</span>
            </div>
            <div className="startup-loader__log" aria-hidden="true">
              <p>loading projects ............. {Math.min(24, Math.round(progress * 0.24))}/24</p>
              <p>loading textures ............. {Math.min(12, Math.round(progress * 0.12))}/12</p>
              <p>initializing interface ....... {progress < 100 ? '[###       ]' : '[##########]'}</p>
              <p>checking system .............. OK</p>
            </div>
            <div className="startup-loader__prompt" aria-hidden="true"><span>&gt;</span><span className="startup-loader__cursor" /></div>
            <div className="startup-loader__track" role="progressbar" aria-label="Loading portfolio" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
            <p className="startup-loader__hint">{progress < 100 ? `LOADING ${progress}%` : 'READY — PRESS ENTER'}</p>
            <button className="startup-loader__enter" onClick={() => setVisible(false)} aria-label="Enter portfolio">
              <span>ENTER</span> TO CONTINUE
            </button>
          </div>
          <span className="startup-loader__corner">SYS.READY · PLEASE WAIT</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StartupLoader
