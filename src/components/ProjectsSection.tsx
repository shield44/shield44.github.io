'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Download, Video, Link as LinkIcon } from 'lucide-react'

type ProjectLink = {
  href: string
  label: string
  icon: typeof Github
}

type Project = {
  title: string
  description: string
  status: string
  category: string
  links: ProjectLink[]
}

const projects: Project[] = [
  {
    title: 'Official Pixel Experience trees for Xiaomi Redmi 8A Dual (discontinued)',
    description:
      'Device tree for Xiaomi Redmi 8A Dual (olivewood) including hardware configuration, vendor blobs, and kernel integration.',
    status: 'Discontinued',
    category: 'ROM Trees',
    links: [
      { href: 'https://github.com/PixelExperience-Devices/device_xiaomi_olivewood', label: 'Device tree', icon: Github },
      { href: 'https://github.com/PixelExperience-Devices/kernel_xiaomi_olivewood', label: 'Kernel tree', icon: Github },
    ],
  },
  {
    title: 'Official Pixel Experience trees for Xiaomi Redmi 10C (discontinued)',
    description:
      'Device tree for Redmi 10C (fog) to build Pixel Experience ROMs with vendor and kernel integrations.',
    status: 'Discontinued',
    category: 'ROM Trees',
    links: [
      { href: 'https://github.com/PixelExperience-Devices/device_xiaomi_fog', label: 'Device tree', icon: Github },
      { href: 'https://github.com/PixelExperience-Devices/device_xiaomi_fog-kernel', label: 'Kernel tree', icon: Github },
    ],
  },
  {
    title: 'Official Dot OS custom ROM for Redmi 8A Dual (discontinued)',
    description: 'Last official DotOS release for Redmi 8A Dual (olivewood) with stable discontinued builds.',
    status: 'Discontinued',
    category: 'Releases',
    links: [{ href: 'https://www.droidontime.com/devices/olivewood', label: 'Download', icon: Download }],
  },
  {
    title: 'DerpFest trees for Redmi 8A Dual',
    description: 'Complete DerpFest tree set plus downloadable releases for the Olivewood device.',
    status: 'Active archive',
    category: 'ROM Trees',
    links: [
      { href: 'https://github.com/DerpFest-Devices/device_xiaomi_olivewood', label: 'Device tree', icon: Github },
      { href: 'https://github.com/DerpFest-Devices/vendor_xiaomi_olivewood', label: 'Vendor tree', icon: Github },
      { href: 'https://github.com/DerpFest-Devices/kernel_xiaomi_olivewood', label: 'Kernel tree', icon: Github },
      { href: 'https://sourceforge.net/projects/derpfest/files/Olivewood/', label: 'Download', icon: Download },
    ],
  },
  {
    title: 'DerpFest XDA forum for Redmi 8A Dual',
    description: 'Background context, updates, and user discussion about the DerpFest Olivewood releases.',
    status: 'Reference',
    category: 'Documentation',
    links: [
      {
        href: 'https://xdaforums.com/t/rom-11-0-stable-derpfest-r-for-redmi-8a-dual-official-olivewood.4290821/',
        label: 'XDA Forum',
        icon: ExternalLink,
      },
    ],
  },
  {
    title: 'SDM439 common device tree',
    description: 'Common device tree for SDM439 devices (pine, olivewood, olivelite, and olive) with OSS camera support.',
    status: 'Reference',
    category: 'Device Trees',
    links: [{ href: 'https://github.com/mi-sdm439/device_xiaomi_sdm439-common', label: 'View on GitHub', icon: Github }],
  },
  {
    title: 'Pixel Plus UI for Redmi 8A Dual',
    description: 'XDA thread for Pixel Plus UI builds and discussion for Olivewood users.',
    status: 'Reference',
    category: 'Documentation',
    links: [
      {
        href: 'https://xdaforums.com/t/rom-official-11-0-redmi-8a-dual-pixelplus-ui-aosp.4300225/',
        label: 'XDA Forum',
        icon: ExternalLink,
      },
    ],
  },
  {
    title: 'DotOS device trees for Redmi 8A Dual',
    description: 'Complete DotOS tree collection for Redmi 8A Dual ROM development.',
    status: 'Archive',
    category: 'ROM Trees',
    links: [
      { href: 'https://github.com/dotOS-Devices/device_xiaomi_olivewood', label: 'Device tree', icon: Github },
      { href: 'https://github.com/dotOS-Devices/vendor_xiaomi_olivewood', label: 'Vendor tree', icon: Github },
      { href: 'https://github.com/dotOS-Devices/kernel_xiaomi_olivewood', label: 'Kernel tree', icon: Github },
    ],
  },
  {
    title: 'LineageOS device trees for Redmi 8A Dual',
    description: 'LineageOS trees for Redmi 8A Dual, covering device, vendor, and kernel sources.',
    status: 'Archive',
    category: 'ROM Trees',
    links: [
      { href: 'https://github.com/shield44/device_xiaomi_olivewood', label: 'Device tree', icon: Github },
      { href: 'https://github.com/shield44/vendor_xiaomi_olivewood', label: 'Vendor tree', icon: Github },
      { href: 'https://github.com/shield44/kernel_xiaomi_olivewood', label: 'Kernel tree', icon: Github },
    ],
  },
  {
    title: 'Download custom ROMs for Redmi 10C',
    description: 'Compiled release links for custom ROM packages ready for flashing on Redmi 10C.',
    status: 'Download pack',
    category: 'Releases',
    links: [
      {
        href: 'https://github.com/shield44/OTA/releases/download/aospa-topaz-unofficial-fog-20230126.zip/aospa-topaz-unofficial-fog-20230126.zip',
        label: 'AOSPA',
        icon: Download,
      },
      {
        href: 'https://github.com/shield44/OTA/releases/download/PixelExperience_fog-13.0-20231018-0824-UNOFFICIAL.zip/PixelExperience_fog-13.0-20231018-0824-UNOFFICIAL.zip',
        label: 'Pixel Experience',
        icon: Download,
      },
      {
        href: 'https://github.com/shield44/OTA/releases/download/lineage-19.1-20220815-UNOFFICIAL-fog/lineage-19.1-20220815-UNOFFICIAL-fog.zip',
        label: 'LineageOS 19.1',
        icon: Download,
      },
    ],
  },
  {
    title: 'Installation guide for custom ROMs',
    description: 'Video tutorials covering ROM installation and flashing workflows.',
    status: 'Guide',
    category: 'Tutorials',
    links: [
      { href: 'https://www.youtube.com/playlist?list=PLTP_SKiUN5_hwtlgBpZIC4rzXel_b4PK4', label: 'Tutorials', icon: Video },
    ],
  },
]

const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="projects" ref={ref} className="section-shell">
      <div className="content-wrap">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle mb-4">Portfolio</p>
          <h2 className="section-heading mb-5">Featured Projects</h2>
          <p className="text-slate-200/85 max-w-3xl mx-auto">
            A curated list of ROM development trees, release links, and supporting resources.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className="glass-surface p-6 flex flex-col h-full border border-white/20 hover:border-cyan-200/40 transition-all duration-300"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="flex items-center justify-between gap-3 mb-3 text-xs uppercase tracking-[0.18em]">
                <span className="text-cyan-100/85">{project.category}</span>
                <span className="text-slate-300/75">{project.status}</span>
              </div>

              <h3 className="text-lg font-semibold text-cyan-100 leading-snug">{project.title}</h3>
              <p className="text-slate-200/80 text-sm mt-3 leading-relaxed flex-grow">{project.description}</p>

              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-300/85 mb-3">
                  <LinkIcon size={14} />
                  <span>{project.links.length} resource{project.links.length > 1 ? 's' : ''}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => {
                    const IconComponent = link.icon
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-focus inline-flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/20 text-cyan-100 text-xs rounded-lg hover:bg-cyan-200 hover:text-slate-900 hover:border-cyan-100 transition-all duration-300"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <IconComponent size={14} />
                        {link.label}
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
