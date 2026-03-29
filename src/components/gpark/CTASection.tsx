'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Section number watermark */}
      <div className="section-number">07</div>

      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-[#00D4FF]" />
            <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase">
              Let&apos;s Create
            </span>
            <div className="w-12 h-px bg-[#00D4FF]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Have a project
            <br />
            in mind?
          </h2>

          <p className="text-lg text-white/40 mb-12">
            Let&apos;s talk.
          </p>

          {/* Contact buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@craf-t.studio"
              className="group flex items-center gap-3 px-8 py-4 bg-[#00D4FF] text-black rounded-sm font-medium text-sm hover:bg-[#00D4FF]/90 transition-all electric-glow"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              hello@craf-t.studio
            </a>

            <a
              href="https://www.craf-t.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-white/10 text-white/70 rounded-sm font-medium text-sm hover:border-[#00D4FF]/30 hover:text-white transition-all bg-white/[0.02]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              www.craf-t.studio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center">
            <span className="text-[#00D4FF] font-bold text-[10px]">CT</span>
          </div>
          <span className="text-xs text-white/30">
            © CRAF-T Studio — 3D Motion Design
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-xs text-white/20 font-mono">
            G-Park Case Study
          </span>
          <span className="text-xs text-white/10 font-mono">
            2022
          </span>
        </div>
      </div>
    </footer>
  )
}
