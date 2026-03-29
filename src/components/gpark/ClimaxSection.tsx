'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const scenes = [
  { time: '0:00-0:03', system: 'Introduction', desc: 'Urban aerial view' },
  { time: '0:03-0:08', system: 'Tower System', desc: 'Vertical elevator parking' },
  { time: '0:08-0:15', system: 'Crane System', desc: 'Mechanical arm lifting' },
  { time: '0:15-0:22', system: 'Puzzle System', desc: 'Sliding platforms' },
  { time: '0:22-0:30', system: 'Silo System', desc: 'Cylindrical storage' },
  { time: '0:30-0:40', system: 'Shuttle System', desc: 'Track-based transport' },
  { time: '0:40-0:50', system: 'Underground', desc: 'Subterranean parking' },
  { time: '0:50-0:56', system: 'Conclusion', desc: 'Craf-T branding' },
]

export default function ClimaxSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="climax"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section number watermark */}
      <div className="section-number">05</div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#00D4FF]" />
            <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase">
              The Result
            </span>
            <div className="w-12 h-px bg-[#00D4FF]" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            One Video. Seven Systems.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            The deliverable: a single 4K video, 56 seconds long, showcasing all
            seven parking systems within a unified visual language.
          </p>
        </motion.div>

        {/* Video player placeholder */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative rounded-sm overflow-hidden border border-white/5 bg-black aspect-video electric-glow">
            {/* Video element - will load when available */}
            <video
              src="/images/video/G-Park.mp4"
              controls
              muted
              playsInline
              className="w-full h-full object-cover"
              poster=""
            >
              <source src="/images/video/G-Park.mp4" type="video/mp4" />
            </video>

            {/* Play overlay when video not loaded */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  fillOpacity="0.6"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-white/40">
                    G-Park Thailand — 3D Product Showcase
                  </div>
                  <div className="text-sm text-white/80 mt-0.5">
                    All Seven Automated Parking Systems
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                  <span>4K</span>
                  <span>56s</span>
                  <span>30fps</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene breakdown grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-xs font-mono text-white/30 mb-4 tracking-widest uppercase">
            Scene Breakdown
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scenes.map((scene, i) => (
              <div
                key={scene.time}
                className="group relative rounded-sm overflow-hidden border border-white/5 bg-white/[0.01] hover:border-[#00D4FF]/20 transition-all duration-300"
              >
                {/* Placeholder for shot GIF */}
                <div className="placeholder-img aspect-video">
                  <div className="text-center p-2">
                    <span className="text-[10px] text-white/15 font-mono">
                      {scene.time}
                    </span>
                  </div>
                </div>

                {/* Info overlay on hover */}
                <div className="p-3">
                  <div className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                    {scene.system}
                  </div>
                  <div className="text-[10px] text-white/25 font-mono mt-0.5">
                    {scene.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key qualities */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            'Consistent Lighting',
            'Smooth Transitions',
            'Technical Accuracy',
            'Visual Clarity',
          ].map((quality) => (
            <span key={quality} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#00D4FF]/50" />
              {quality}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
