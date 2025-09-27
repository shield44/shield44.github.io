'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Download, Video } from 'lucide-react'

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

  const projects = [
    {
      title: "🔹Official Pixel Experience trees for Xiaomi Redmi 8A Dual (discontinued)",
      description: "Device tree for Xiaomi Redmi 8A Dual (olivewood) to build Pixel Experience ROMs, including hardware configuration, vendor blobs, and kernel integration.",
      links: [
        { href: "https://github.com/PixelExperience-Devices/device_xiaomi_olivewood", label: "Device tree", icon: Github },
        { href: "https://github.com/PixelExperience-Devices/kernel_xiaomi_olivewood", label: "Kernel tree", icon: Github }
      ]
    },
    {
      title: "🔹 Official Pixel Experience trees for Xiaomi Redmi 10C (fog) (discontinued)",
      description: "Device tree for Redmi 10C (fog) to build Pixel Experience ROMs, including hardware configuration, vendor blobs, and kernel integration.",
      links: [
        { href: "https://github.com/PixelExperience-Devices/device_xiaomi_fog", label: "Device tree", icon: Github },
        { href: "https://github.com/PixelExperience-Devices/device_xiaomi_fog-kernel", label: "kernel tree", icon: Github }
      ]
    },
    {
      title: "🔹Official Dot OS Custom rom for Redmi 8A dual (discontinued)",
      description: "Get the last official release of DotOS for the Redmi 8A Dual (olivewood) — stable, smooth, and discontinued.",
      links: [
        { href: "https://www.droidontime.com/devices/olivewood", label: "Download now", icon: Download }
      ]
    },
    {
      title: "🔹 Derpfest trees for Redmi 8A dual",
      description: "Device trees and you can download the custom roms at telegram of derpfest.",
      links: [
        { href: "https://github.com/DerpFest-Devices/device_xiaomi_olivewood", label: "Device tree", icon: Github },
        { href: "https://github.com/DerpFest-Devices/vendor_xiaomi_olivewood", label: "Vendor tree", icon: Github },
        { href: "https://github.com/DerpFest-Devices/kernel_xiaomi_olivewood", label: "Kernel tree", icon: Github },
        { href: "https://sourceforge.net/projects/derpfest/files/Olivewood/", label: "Download now", icon: Download }
      ]
    },
    {
      title: "🔹Derpfest XDA forum for redmi 8a dual",
      description: "For more information check xda forum.",
      links: [
        { href: "https://xdaforums.com/t/rom-11-0-stable-derpfest-r-for-redmi-8a-dual-official-olivewood.4290821/", label: "Check out!!", icon: ExternalLink }
      ]
    },
    {
      title: "🔹 SDM439 common device tree",
      description: "A common device tree for all sdm439 devices (pine,olivewood,olivelite and olive) with oss camera support.",
      links: [
        { href: "https://github.com/mi-sdm439/device_xiaomi_sdm439-common", label: "View on GitHub", icon: Github }
      ]
    },
    {
      title: "🔹 Pixel Plus UI for Redmi 8A dual",
      description: "For more information check xda forum.",
      links: [
        { href: "https://xdaforums.com/t/rom-official-11-0-redmi-8a-dual-pixelplus-ui-aosp.4300225/", label: "XDA Forum", icon: ExternalLink }
      ]
    },
    {
      title: "🔹 Dot os device trees for Redmi 8A dual",
      description: "Complete device tree collection for DotOS ROM development.",
      links: [
        { href: "https://github.com/dotOS-Devices/device_xiaomi_olivewood", label: "Device tree", icon: Github },
        { href: "https://github.com/dotOS-Devices/vendor_xiaomi_olivewood", label: "Vendor tree", icon: Github },
        { href: "https://github.com/dotOS-Devices/kernel_xiaomi_olivewood", label: "Kernel tree", icon: Github }
      ]
    },
    {
      title: "🔹 Lineage os device trees for Redmi 8A dual",
      description: "LineageOS device trees for stable custom ROM experience.",
      links: [
        { href: "https://github.com/shield44/device_xiaomi_olivewood", label: "Device tree", icon: Github },
        { href: "https://github.com/shield44/vendor_xiaomi_olivewood", label: "Vendor tree", icon: Github },
        { href: "https://github.com/shield44/kernel_xiaomi_olivewood", label: "Kernel tree", icon: Github }
      ]
    },
    {
      title: "🔹 Download custom roms for Redmi 10C",
      description: "Collection of custom ROMs ready for download and installation.",
      links: [
        { href: "https://github.com/shield44/OTA/releases/download/aospa-topaz-unofficial-fog-20230126.zip/aospa-topaz-unofficial-fog-20230126.zip", label: "AOSPA (caf based rom)", icon: Download },
        { href: "https://github.com/shield44/OTA/releases/download/PixelExperience_fog-13.0-20231018-0824-UNOFFICIAL.zip/PixelExperience_fog-13.0-20231018-0824-UNOFFICIAL.zip", label: "PE", icon: Download },
        { href: "https://github.com/shield44/OTA/releases/download/lineage-19.1-20220815-UNOFFICIAL-fog/lineage-19.1-20220815-UNOFFICIAL-fog.zip", label: "LineageOS 19.1", icon: Download }
      ]
    },
    {
      title: "🔹 Installation guide for custom roms",
      description: "Complete video tutorials for ROM installation and flashing.",
      links: [
        { href: "https://www.youtube.com/playlist?list=PLTP_SKiUN5_hwtlgBpZIC4rzXel_b4PK4", label: "Tutorials", icon: Video }
      ]
    }
  ]

  return (
    <section 
      id="projects" 
      ref={ref}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
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
            Featured Projects
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-8"
            variants={itemVariants}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 card-glow group"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-primary mb-3 group-hover:text-blue-400 transition-colors duration-300"
              >
                {project.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-400 text-sm mb-4 leading-relaxed"
              >
                {project.description}
              </motion.p>
              
              <motion.div className="flex flex-wrap gap-2">
                {project.links.map((link, linkIndex) => {
                  const IconComponent = link.icon
                  return (
                    <motion.a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 text-primary text-xs rounded-lg hover:bg-primary hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent size={14} />
                      {link.label}
                    </motion.a>
                  )
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection