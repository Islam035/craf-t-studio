'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function HelloSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="hello"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden"
    >
      {/* Section number watermark */}
      <div className="section-number">02</div>

      {/* Background subtle grid */}
      <div className="absolute inset-0 parking-grid-bg opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-px bg-[#00D4FF]" />
              <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase">
                The Client
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Seven systems.
              <br />
              <span className="text-white/40">One vision.</span>
            </motion.h2>

            <motion.div
              className="space-y-5 text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p>
                G-Park Thailand develops automated parking systems for
                space-constrained urban environments. Based in Bangkok, their
                portfolio includes seven distinct technologies—from Tower systems
                that stack cars vertically to AGV systems using autonomous
                vehicles for transport.
              </p>
              <p>
                When they approached Craf-T, they had a fragmented marketing
                approach. Seven separate videos. Seven separate messages. No
                unified entry point for potential clients.
              </p>
              <p className="text-white font-medium text-lg">
                They needed one video that could tell the whole story.
              </p>
            </motion.div>

            {/* Key metrics */}
            <motion.div
              className="mt-10 grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { value: '7', label: 'Parking Systems' },
                { value: '56s', label: 'Final Duration' },
                { value: '4K', label: 'Resolution' },
              ].map((metric) => (
                <div key={metric.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-[#00D4FF] font-mono">
                    {metric.value}
                  </div>
                  <div className="text-xs text-white/30 mt-1 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Parking systems list */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { name: 'Tower System', desc: 'Vertical stacking with elevator mechanisms' },
              { name: 'Crane System', desc: 'Multi-level storage with lifting arms' },
              { name: 'Puzzle System', desc: 'Grid-based sliding platforms' },
              { name: 'Silo System', desc: 'Cylindrical vertical storage' },
              { name: 'Shuttle System', desc: 'Horizontal track-based transport' },
              { name: 'Underground System', desc: 'Subterranean multi-level parking' },
              { name: 'AGV System', desc: 'Autonomous guided vehicles' },
            ].map((system, i) => (
              <div
                key={system.name}
                className="flex items-start gap-4 p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00D4FF]/20 transition-all duration-300 group"
              >
                <span className="text-xs font-mono text-white/20 mt-1 min-w-[2ch]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="text-sm font-medium text-white/80 group-hover:text-[#00D4FF] transition-colors">
                    {system.name}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">{system.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
