'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const stages = [
  {
    id: 'development',
    label: '01',
    title: 'Development',
    hours: '~5 hours',
    color: '#FFFFFF',
    description:
      'Working without a detailed creative brief, Craf-T began with deep comprehension. The team studied reference materials — photos and videos of real parking installations — to understand not just how each system worked, but why it mattered. A reverse storyboard approach captured the hero frame from each scene, documenting the visual narrative.',
    tools: ['Traditional', 'Sketching', 'Mood Board'],
    visual: 'storyboard',
  },
  {
    id: 'pre-production',
    label: '02',
    title: 'Pre-Production',
    hours: '~5 hours',
    color: '#CCCCCC',
    description:
      'Rough animatics established timing for all seven system segments within the 56-second constraint. Camera paths and transitions were blocked out to ensure smooth visual flow between segments.',
    tools: ['Blender', 'Animatics', 'Camera Blocking'],
    visual: 'animatic',
  },
  {
    id: 'production',
    label: '03',
    title: 'Production',
    hours: '~75 hours',
    color: '#00D4FF',
    description:
      'All seven parking systems were modeled from scratch in Blender using only photos and videos as reference. No CAD files. No technical drawings. Soft, diffused studio lighting highlighted mechanical details without harsh shadows. Animation was simulation-grade — natural, realistic motion representing real-world operation.',
    tools: ['Blender', 'Blender Cycles', '4K Rendering'],
    visual: 'modeling',
  },
  {
    id: 'post-production',
    label: '04',
    title: 'Post-Production',
    hours: '~15 hours',
    color: '#FFD000',
    description:
      'DaVinci Resolve handled professional color grading for visual consistency. Adobe Premiere added system identification text overlays and refined timing.',
    tools: ['DaVinci Resolve', 'Adobe Premiere', 'H.264'],
    visual: 'grading',
  },
]

function PlaceholderImage({
  src,
  label,
  className = '',
}: {
  src: string
  label: string
  className?: string
}) {
  return (
    <div className={`placeholder-img ${className}`}>
      <div className="text-center p-4">
        <div className="w-8 h-8 mx-auto mb-2 rounded-sm bg-white/5 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/20"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
        <span className="text-[10px] text-white/20 font-mono">{label}</span>
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeStage, setActiveStage] = useState(0)

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section number watermark */}
      <div className="section-number">04</div>

      {/* Background */}
      <div className="absolute inset-0 parking-grid-bg opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#00D4FF]" />
            <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase">
              The Process
            </span>
            <div className="w-12 h-px bg-[#00D4FF]" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            4 Stages. 100 Hours.
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">
            From uncertainty to delivery — how a clear process turns ambiguity into
            a polished product.
          </p>
        </motion.div>

        {/* Stage timeline bar */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(i)}
              className="flex items-center gap-2"
            >
              <div
                className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all duration-300 ${
                  activeStage === i
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/30 hover:text-white/50'
                }`}
              >
                {stage.label}
              </div>
              {i < stages.length - 1 && (
                <div
                  className="w-8 md:w-16 h-px"
                  style={{
                    background:
                      i < activeStage
                        ? `linear-gradient(90deg, ${stages[i].color}40, ${stages[i + 1].color}40)`
                        : 'rgba(255,255,255,0.05)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active stage detail */}
        <motion.div
          key={activeStage}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stage info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-5xl font-bold font-mono"
                style={{ color: stages[activeStage].color + '30' }}
              >
                {stages[activeStage].label}
              </span>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: stages[activeStage].color }}
                >
                  {stages[activeStage].title}
                </h3>
                <span className="text-xs font-mono text-white/30">
                  {stages[activeStage].hours}
                </span>
              </div>
            </div>

            <p className="text-white/60 leading-relaxed mb-6">
              {stages[activeStage].description}
            </p>

            {/* Tools */}
            <div className="flex flex-wrap gap-2">
              {stages[activeStage].tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-xs font-mono border border-white/10 rounded-sm text-white/40 bg-white/[0.02]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Visual area */}
          <div
            className="rounded-sm border border-white/5 overflow-hidden bg-white/[0.01] min-h-[280px]"
          >
            {stages[activeStage].visual === 'storyboard' ? (
              <div className="p-4">
                <div className="text-xs font-mono text-white/30 mb-3">
                  STORYBOARD — 7 Sequential Pencil Sketches
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <PlaceholderImage
                      key={n}
                      src={`/images/storyboard/${n}.png`}
                      label={`${n}/7`}
                      className="aspect-[3/4]"
                    />
                  ))}
                </div>
              </div>
            ) : stages[activeStage].visual === 'modeling' ? (
              <div className="p-4">
                <div className="text-xs font-mono text-white/30 mb-3">
                  PRODUCTION — Blender Viewport
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <PlaceholderImage
                    src="/images/process/Process-1.gif"
                    label="Modeling"
                    className="aspect-video"
                  />
                  <PlaceholderImage
                    src="/images/process/Process-2.gif"
                    label="Materials"
                    className="aspect-video"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[280px]">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold font-mono mb-2"
                    style={{ color: stages[activeStage].color + '15' }}
                  >
                    {stages[activeStage].label}
                  </div>
                  <div className="text-xs font-mono text-white/20">
                    {stages[activeStage].title.toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* All stages overview - compact */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stages.map((stage, i) => (
            <div
              key={stage.id}
              onClick={() => setActiveStage(i)}
              className="p-4 rounded-sm border border-white/5 bg-white/[0.01] cursor-pointer hover:border-white/10 hover:bg-white/[0.03] transition-all group"
            >
              <div className="text-xs font-mono text-white/20 mb-1">
                {stage.label}
              </div>
              <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {stage.title}
              </div>
              <div className="text-xs font-mono text-white/30 mt-1">
                {stage.hours}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
