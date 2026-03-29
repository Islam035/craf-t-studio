'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const beforeAfter = [
  { before: '7 separate videos', after: '1 unified narrative' },
  { before: 'No clear entry point', after: 'Defined conversation starter' },
  { before: 'Fragmented message', after: 'Consolidated marketing' },
  { before: 'Client without vision', after: 'Collaborative partnership' },
]

export default function ImpactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section number watermark */}
      <div className="section-number">06</div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Testimonial */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#00D4FF]" />
            <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase">
              Client Impact
            </span>
          </div>

          {/* Quote */}
          <div className="relative p-8 md:p-12 rounded-sm border border-white/5 bg-white/[0.01]">
            {/* Quote mark */}
            <div className="absolute top-4 left-6 text-6xl text-[#00D4FF]/10 font-serif leading-none">
              &ldquo;
            </div>

            <blockquote className="relative text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed font-light italic">
              Completed successfully! Excellent Studio, high-quality work, fast
              delivery, and communication. Would highly recommend if you have a
              project and want it done right.
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
                <span className="text-[#00D4FF] font-bold text-xs">GP</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white/70">
                  G-Park Thailand
                </div>
                <div className="text-xs text-white/30">Bangkok, Thailand</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before & After */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-xs font-mono text-white/30 mb-6 tracking-widest uppercase">
            Before & After
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Before column */}
            <div className="border border-white/5 rounded-sm-l p-6 md:p-8 bg-white/[0.01] md:rounded-l-sm md:rounded-r-none rounded-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <span className="text-xs font-mono text-red-400/60 uppercase tracking-widest">
                  Before
                </span>
              </div>
              <div className="space-y-4">
                {beforeAfter.map((item) => (
                  <div
                    key={item.before}
                    className="flex items-start gap-3 text-white/40"
                  >
                    <span className="text-red-400/30 mt-0.5 text-xs">✕</span>
                    <span className="text-sm">{item.before}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After column */}
            <div className="border border-[#00D4FF]/10 rounded-sm p-6 md:p-8 bg-[#00D4FF]/[0.02] md:rounded-l-none md:rounded-r-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#00D4FF]/50" />
                <span className="text-xs font-mono text-[#00D4FF]/60 uppercase tracking-widest">
                  After
                </span>
              </div>
              <div className="space-y-4">
                {beforeAfter.map((item) => (
                  <div
                    key={item.after}
                    className="flex items-start gap-3 text-[#00D4FF]/80"
                  >
                    <span className="text-[#00D4FF]/50 mt-0.5 text-xs">✓</span>
                    <span className="text-sm">{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-xs font-mono text-white/30 mb-6 tracking-widest uppercase">
            Key Takeaways
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Process Over Prescription',
                text: 'When a client lacks a clear creative vision, the studio\'s process becomes the product. Clear communication, iterative feedback, and patient collaboration are not extras; they are the foundation of success.',
              },
              {
                title: 'Cross-Cultural Competence',
                text: 'Working with international clients requires more than technical skill. It requires the ability to listen, interpret, and adapt. Navigating linguistic and cultural distances without losing creative momentum.',
              },
              {
                title: 'Technical Storytelling',
                text: 'Complex products do not require complex explanations. Through careful visual design and narrative structure, seven technical systems became one accessible story — not a simplification, but a clarification of value.',
              },
              {
                title: 'Reference Interpretation',
                text: 'Building accurate 3D models from limited reference materials — photos and videos only, no CAD files — demonstrated the ability to interpret, extrapolate, and create technically plausible solutions.',
              },
            ].map((takeaway) => (
              <div
                key={takeaway.title}
                className="p-6 rounded-sm border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors"
              >
                <h4 className="text-sm font-semibold text-white/80 mb-2">
                  {takeaway.title}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed">
                  {takeaway.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
