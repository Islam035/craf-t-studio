'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function GapSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="gap"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden"
    >
      {/* Section number watermark */}
      <div className="section-number">03</div>

      {/* Chaotic background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF]/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFD000]/[0.02] rounded-full blur-[100px]" />
        {/* Scattered grid lines */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '37px 73px',
            transform: 'rotate(0.5deg)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 w-full">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-px bg-[#FFD000]" />
          <span className="text-xs font-mono text-[#FFD000] tracking-widest uppercase">
            The Challenge
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          No brief. No CAD.
          <br />
          <span className="text-white/40">Just trust.</span>
        </motion.h2>

        <div className="space-y-8">
          {[
            {
              icon: '⊥',
              title: 'The Communication Challenge',
              text: 'The client approached Craf-T without a detailed creative brief. They knew what they needed but didn\'t have a specific vision for how it should look, feel, or flow. They trusted the studio to develop the creative direction independently.',
            },
            {
              icon: '⟳',
              title: 'The Revision Dynamic',
              text: 'Working with a Thai client presented its own considerations. Cross-cultural communication requires patience, clarity, and the ability to interpret needs that may not be explicitly stated. The client\'s feedback during production was above average in volume.',
            },
            {
              icon: '⏱',
              title: 'The Time Constraint',
              text: 'With approximately 100 hours of production time, the team needed to model, animate, and render seven distinct parking systems, each with unique mechanical behaviors, all within a video that would run under one minute.',
            },
            {
              icon: '◇',
              title: 'The Technical Challenge',
              text: 'No CAD files. No technical drawings. Only photos and videos of real installations as reference materials. The team would need to reconstruct seven complex mechanical systems through visual interpretation and creative problem-solving.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex gap-6 items-start p-6 rounded-sm border border-white/5 bg-white/[0.01]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="w-10 h-10 flex-shrink-0 rounded-sm bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#00D4FF] font-mono text-sm">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
