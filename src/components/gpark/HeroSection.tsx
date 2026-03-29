'use client'

import { motion } from 'framer-motion'
import CarCanvas from './CarCanvas'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_70%)]" />

      {/* 3D Car Canvas - Full screen behind text */}
      <div className="absolute inset-0 z-0">
        <CarCanvas />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
        {/* Tags */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {['G-Park Thailand', '3D Animation', 'Product Showcase', 'Smart Parking'].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono tracking-wider border border-white/10 rounded-sm text-white/40 bg-white/[0.02]"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-white">How G-Park Turned</span>
          <br />
          <span className="text-white">Seven Videos Into</span>
          <br />
          <span className="text-[#00D4FF]">One Powerful Story</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          A 56-second 3D animation that consolidated an entire product line
          into a single marketing asset
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs font-mono text-white/20 tracking-widest uppercase">
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#00D4FF]/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
    </section>
  )
}
