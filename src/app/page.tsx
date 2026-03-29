'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigation, ScrollProgress } from '@/components/gpark/Navigation'
import HeroSection from '@/components/gpark/HeroSection'
import HelloSection from '@/components/gpark/HelloSection'
import GapSection from '@/components/gpark/GapSection'
import ProcessSection from '@/components/gpark/ProcessSection'
import ClimaxSection from '@/components/gpark/ClimaxSection'
import ImpactSection from '@/components/gpark/ImpactSection'
import CTASection, { Footer } from '@/components/gpark/CTASection'
import ParkingGrid from '@/components/gpark/ParkingGrid'
import { useScrollStore, type CarSection } from '@/components/gpark/carStore'

const floors = [
  { label: 'B2', sectionId: 'hero' },
  { label: 'B1', sectionId: 'hero' },
  { label: '1F', sectionId: 'hello' },
  { label: '2F', sectionId: 'gap' },
  { label: '3F', sectionId: 'process' },
  { label: '4F', sectionId: 'climax' },
  { label: '5F', sectionId: 'impact' },
  { label: '6F', sectionId: 'cta' },
]

const sectionMap: Record<string, CarSection> = {
  hero: 'hero',
  hello: 'hello',
  gap: 'gap',
  process: 'process-dev',
  climax: 'climax',
  impact: 'impact',
  cta: 'cta',
}

export default function Home() {
  const setScrollData = useScrollStore((s) => s.setScrollData)
  const [activeFloor, setActiveFloor] = useState(0)

  const activeFloorRef = useRef(0)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(1, Math.max(0, scrollY / docHeight))

    // Determine which section is in view
    const sections = ['hero', 'hello', 'gap', 'process', 'climax', 'impact', 'cta']
    let currentSection = 'hero'
    let sectionProgress = 0

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const top = rect.top
      const height = rect.height

      // Section is in view when its top is within the viewport
      if (top < window.innerHeight * 0.5 && top + height > 0) {
        currentSection = sectionId
        sectionProgress = Math.max(0, Math.min(1, -top / height))
        break
      }
    }

    // Map section to car state
    const carSection = sectionMap[currentSection] || 'hero'

    // For process section, determine sub-stage
    let processStage: CarSection = 'process-dev'
    if (currentSection === 'process') {
      if (sectionProgress < 0.25) processStage = 'process-dev'
      else if (sectionProgress < 0.5) processStage = 'process-pre'
      else if (sectionProgress < 0.75) processStage = 'process-prod'
      else processStage = 'process-post'
    } else {
      processStage = carSection
    }

    setScrollData(processStage, progress, sectionProgress, activeFloorRef.current)

    // Update floor indicator
    const floorIndex = floors.findIndex((f) => f.sectionId === currentSection)
    if (floorIndex >= 0 && floorIndex !== activeFloorRef.current) {
      activeFloorRef.current = floorIndex
      setActiveFloor(floorIndex)
    }
  }, [setScrollData])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Use rAF to defer the initial call outside of the synchronous effect
    const rafId = requestAnimationFrame(handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [handleScroll])

  return (
    <main className="relative bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
      {/* Fixed background grid */}
      <ParkingGrid />

      {/* Navigation */}
      <Navigation />

      {/* Floor indicator */}
      <ScrollProgress floors={floors} activeFloor={activeFloor} />

      {/* Page sections */}
      <HeroSection />

      <div id="hello">
        <HelloSection />
      </div>

      <div id="gap">
        <GapSection />
      </div>

      <div id="process">
        <ProcessSection />
      </div>

      <div id="climax">
        <ClimaxSection />
      </div>

      <div id="impact">
        <ImpactSection />
      </div>

      <div id="cta">
        <CTASection />
      </div>

      <Footer />
    </main>
  )
}
