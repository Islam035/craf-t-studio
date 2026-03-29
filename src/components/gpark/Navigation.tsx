'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ScrollProgressProps {
  floors: { label: string; sectionId: string }[]
  activeFloor: number
}

export function ScrollProgress({ floors, activeFloor }: ScrollProgressProps) {
  return (
    <motion.div
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* Floor indicator label */}
      <div className="text-xs font-mono text-muted-foreground mb-2 tracking-widest uppercase">
        Floor
      </div>

      {floors.map((floor, i) => (
        <div key={floor.sectionId} className="flex items-center gap-3">
          {/* Floor label */}
          <span
            className={`text-xs font-mono transition-all duration-500 ${
              i === activeFloor
                ? 'text-[#00D4FF] opacity-100'
                : 'text-muted-foreground opacity-30'
            }`}
          >
            {floor.label}
          </span>

          {/* Floor dot / bar */}
          <div
            className={`transition-all duration-500 rounded-sm ${
              i === activeFloor
                ? 'w-1 h-8 bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.5)]'
                : 'w-1 h-3 bg-white/10'
            }`}
          />
        </div>
      ))}

      {/* Current floor large display */}
      <div className="mt-4 text-right">
        <div className="text-2xl font-mono font-bold text-[#00D4FF] tracking-tight">
          {floors[activeFloor]?.label || '1F'}
        </div>
      </div>
    </motion.div>
  )
}

// Navigation bar
export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }, [])

  const navItems = [
    { label: 'Overview', id: 'hello' },
    { label: 'Challenge', id: 'gap' },
    { label: 'Process', id: 'process' },
    { label: 'Result', id: 'climax' },
    { label: 'Impact', id: 'impact' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-sm bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center group-hover:bg-[#00D4FF]/20 transition-colors">
            <span className="text-[#00D4FF] font-bold text-xs">CT</span>
          </div>
          <span className="text-sm font-medium text-white/70 hidden sm:block">
            CRAF-T Studio
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-[#00D4FF] transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('cta')}
            className="text-xs uppercase tracking-widest bg-[#00D4FF] text-black px-4 py-2 rounded-sm hover:bg-[#00D4FF]/90 transition-colors font-medium"
          >
            Contact
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/70"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 8h18M3 16h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 px-4 py-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-3 text-sm uppercase tracking-widest text-white/50 hover:text-[#00D4FF] transition-colors border-b border-white/5 last:border-0"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
