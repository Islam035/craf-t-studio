import { create } from 'zustand'

export type CarSection =
  | 'hero'
  | 'hello'
  | 'gap'
  | 'process-dev'
  | 'process-pre'
  | 'process-prod'
  | 'process-post'
  | 'climax'
  | 'impact'
  | 'cta'

export interface CarState {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  wireframe: number // 0-1 interpolation
  opacity: number
  metalness: number
  roughness: number
  emissiveIntensity: number
  autoRotate: boolean
  autoRotateSpeed: number
  envMapIntensity: number
  colorTint: [number, number, number]
  visible: boolean
}

// Define states for each section
const sectionStates: Record<CarSection, CarState> = {
  hero: {
    position: [0, -0.3, 0],
    rotation: [0, -0.3, 0],
    scale: 1.0,
    wireframe: 0,
    opacity: 1,
    metalness: 0.6,
    roughness: 0.3,
    emissiveIntensity: 0,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    envMapIntensity: 1.0,
    colorTint: [1, 1, 1],
    visible: true,
  },
  hello: {
    position: [3, -0.3, 0],
    rotation: [0, -0.8, 0],
    scale: 0.55,
    wireframe: 0,
    opacity: 0.6,
    metalness: 0.5,
    roughness: 0.35,
    emissiveIntensity: 0,
    autoRotate: false,
    autoRotateSpeed: 0,
    envMapIntensity: 0.8,
    colorTint: [1, 1, 1],
    visible: true,
  },
  gap: {
    position: [0, 0.2, 0],
    rotation: [0.1, -0.2, 0.05],
    scale: 0.8,
    wireframe: 0.6,
    opacity: 0.8,
    metalness: 0.3,
    roughness: 0.6,
    emissiveIntensity: 0.15,
    autoRotate: true,
    autoRotateSpeed: 0.15,
    envMapIntensity: 0.5,
    colorTint: [0.7, 0.85, 1],
    visible: true,
  },
  'process-dev': {
    position: [-2.5, -0.3, 0],
    rotation: [0, -0.5, 0],
    scale: 0.6,
    wireframe: 0.9,
    opacity: 0.9,
    metalness: 0.1,
    roughness: 0.9,
    emissiveIntensity: 0.1,
    autoRotate: true,
    autoRotateSpeed: 0.1,
    envMapIntensity: 0.2,
    colorTint: [1, 1, 1],
    visible: true,
  },
  'process-pre': {
    position: [-1, -0.3, 0],
    rotation: [0, -0.4, 0],
    scale: 0.65,
    wireframe: 0.5,
    opacity: 1,
    metalness: 0.2,
    roughness: 0.7,
    emissiveIntensity: 0.05,
    autoRotate: true,
    autoRotateSpeed: 0.12,
    envMapIntensity: 0.3,
    colorTint: [1, 1, 1],
    visible: true,
  },
  'process-prod': {
    position: [1.5, -0.3, 0],
    rotation: [0, -0.3, 0],
    scale: 0.7,
    wireframe: 0,
    opacity: 1,
    metalness: 0.5,
    roughness: 0.4,
    emissiveIntensity: 0,
    autoRotate: true,
    autoRotateSpeed: 0.2,
    envMapIntensity: 0.7,
    colorTint: [1, 1, 1],
    visible: true,
  },
  'process-post': {
    position: [3, -0.3, 0],
    rotation: [0, -0.35, 0],
    scale: 0.7,
    wireframe: 0,
    opacity: 1,
    metalness: 0.7,
    roughness: 0.2,
    emissiveIntensity: 0,
    autoRotate: true,
    autoRotateSpeed: 0.2,
    envMapIntensity: 1.2,
    colorTint: [1, 1, 1],
    visible: true,
  },
  climax: {
    position: [0, -0.3, 0],
    rotation: [0, -0.25, 0],
    scale: 1.0,
    wireframe: 0,
    opacity: 1,
    metalness: 0.6,
    roughness: 0.3,
    emissiveIntensity: 0,
    autoRotate: true,
    autoRotateSpeed: 0.25,
    envMapIntensity: 1.0,
    colorTint: [1, 1, 1],
    visible: true,
  },
  impact: {
    position: [2.5, -0.3, 0],
    rotation: [0, -0.6, 0],
    scale: 0.6,
    wireframe: 0,
    opacity: 0.7,
    metalness: 0.65,
    roughness: 0.25,
    emissiveIntensity: 0,
    autoRotate: false,
    autoRotateSpeed: 0,
    envMapIntensity: 1.0,
    colorTint: [1, 1, 1],
    visible: true,
  },
  cta: {
    position: [0, -0.3, 0.5],
    rotation: [0, -0.15, 0],
    scale: 0.85,
    wireframe: 0,
    opacity: 1,
    metalness: 0.6,
    roughness: 0.3,
    emissiveIntensity: 0.05,
    autoRotate: false,
    autoRotateSpeed: 0,
    envMapIntensity: 1.0,
    colorTint: [1, 1, 1],
    visible: true,
  },
}

export function getCarState(section: CarSection): CarState {
  return sectionStates[section]
}

export function lerpCarState(a: CarState, b: CarState, t: number): CarState {
  return {
    position: [
      a.position[0] + (b.position[0] - a.position[0]) * t,
      a.position[1] + (b.position[1] - a.position[1]) * t,
      a.position[2] + (b.position[2] - a.position[2]) * t,
    ],
    rotation: [
      a.rotation[0] + (b.rotation[0] - a.rotation[0]) * t,
      a.rotation[1] + (b.rotation[1] - a.rotation[1]) * t,
      a.rotation[2] + (b.rotation[2] - a.rotation[2]) * t,
    ],
    scale: a.scale + (b.scale - a.scale) * t,
    wireframe: a.wireframe + (b.wireframe - a.wireframe) * t,
    opacity: a.opacity + (b.opacity - a.opacity) * t,
    metalness: a.metalness + (b.metalness - a.metalness) * t,
    roughness: a.roughness + (b.roughness - a.roughness) * t,
    emissiveIntensity:
      a.emissiveIntensity + (b.emissiveIntensity - a.emissiveIntensity) * t,
    autoRotate: t > 0.5 ? b.autoRotate : a.autoRotate,
    autoRotateSpeed:
      a.autoRotateSpeed + (b.autoRotateSpeed - a.autoRotateSpeed) * t,
    envMapIntensity:
      a.envMapIntensity + (b.envMapIntensity - a.envMapIntensity) * t,
    colorTint: [
      a.colorTint[0] + (b.colorTint[0] - a.colorTint[0]) * t,
      a.colorTint[1] + (b.colorTint[1] - a.colorTint[1]) * t,
      a.colorTint[2] + (b.colorTint[2] - a.colorTint[2]) * t,
    ],
    visible: a.visible || b.visible,
  }
}

interface ScrollStore {
  currentSection: CarSection
  prevSection: CarSection
  scrollProgress: number // 0-1 overall page scroll
  sectionProgress: number // 0-1 within current section
  currentFloor: number
  setScrollData: (
    section: CarSection,
    progress: number,
    sectionProgress: number,
    floor: number
  ) => void
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  currentSection: 'hero',
  prevSection: 'hero',
  scrollProgress: 0,
  sectionProgress: 0,
  currentFloor: 0,
  setScrollData: (section, progress, sectionProgress, floor) => {
    const prev = get().currentSection
    // Once we're past halfway into a new section, update prevSection
    const newPrev = sectionProgress > 0.5 ? section : prev
    set({
      currentSection: section,
      prevSection: newPrev,
      scrollProgress: progress,
      sectionProgress,
      currentFloor: floor,
    })
  },
}))
