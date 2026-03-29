'use client'

export default function ParkingGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Faint parking grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '120px 240px',
        }}
      />

      {/* Parking spot markings at edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[60px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 240px',
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-[60px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 240px',
        }}
      />
    </div>
  )
}
