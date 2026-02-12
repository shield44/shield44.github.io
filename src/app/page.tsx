'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import VideoSection from '@/components/VideoSection'
import ContactSection from '@/components/ContactSection'
import SponsorSection from '@/components/SponsorSection'
import Footer from '@/components/Footer'
import InteractiveBackground from '@/components/InteractiveBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <InteractiveBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <VideoSection />
      <SponsorSection />
      <ContactSection />
      <Footer />
    </main>
  )
}