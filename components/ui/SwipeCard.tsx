'use client'
import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import { MapPin, Clock, CheckCircle2, Briefcase } from 'lucide-react'
import type { Job } from '@/lib/types'

type Props = {
  job: Job
  isTop: boolean
  stackIndex: number
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onClick?: () => void
}

export default function SwipeCard({ job, isTop, stackIndex, onSwipeLeft, onSwipeRight, onClick }: Props) {
  const [pos, setPos] = useState({ x: 0, rotation: 0, opacity: 1 })
  const [isDragging, setIsDragging] = useState(false)

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], direction: [xDir], tap }) => {
      if (tap) { onClick?.(); return }

      const trigger = Math.abs(mx) > 120 || Math.abs(vx) > 0.5
      const dir = mx > 0 ? 1 : -1

      setIsDragging(active)

      if (!active && trigger) {
        setPos({ x: dir * 700, rotation: dir * 35, opacity: 0 })
        setTimeout(() => {
          dir > 0 ? onSwipeRight() : onSwipeLeft()
        }, 280)
      } else if (active) {
        setPos({ x: mx, rotation: mx / 15, opacity: 1 })
      } else {
        setPos({ x: 0, rotation: 0, opacity: 1 })
      }
    },
    { filterTaps: true, threshold: 8 }
  )

  const interestedOpacity = Math.max(0, Math.min(pos.x / 100, 1))
  const passOpacity = Math.max(0, Math.min(-pos.x / 100, 1))

  const scale = isTop ? 1 : 1 - stackIndex * 0.04
  const translateY = isTop ? 0 : stackIndex * 10

  return (
    <div
      {...(isTop ? bind() : {})}
      className="absolute inset-x-4 touch-none select-none"
      style={{
        transform: isTop
          ? `translateX(${pos.x}px) rotate(${pos.rotation}deg)`
          : `scale(${scale}) translateY(${translateY}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease',
        opacity: pos.opacity,
        zIndex: isTop ? 10 : 10 - stackIndex,
        cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* Overlays */}
      {isTop && (
        <>
          <div
            className="absolute top-8 left-6 z-20 border-[3px] border-green-400 rounded-xl px-3 py-1.5 -rotate-12 pointer-events-none"
            style={{ opacity: interestedOpacity }}
          >
            <span className="text-green-400 font-bold text-xl tracking-widest">INTERESTED</span>
          </div>
          <div
            className="absolute top-8 right-6 z-20 border-[3px] border-red-400 rounded-xl px-3 py-1.5 rotate-12 pointer-events-none"
            style={{ opacity: passOpacity }}
          >
            <span className="text-red-400 font-bold text-xl tracking-widest">PASS</span>
          </div>
        </>
      )}

      {/* Card body */}
      <div
        className="bg-dark-2 rounded-3xl overflow-hidden relative"
        style={{ height: 460 }}
      >
        {/* Top gradient area with company info */}
        <div
          className="absolute inset-x-0 top-0 h-48 flex flex-col justify-end p-5"
          style={{
            background: `linear-gradient(180deg, ${job.logoColor}22 0%, ${job.logoColor}44 40%, #1a1a1a 100%)`,
          }}
        >
          {/* Company logo */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg"
              style={{ backgroundColor: job.logoColor }}
            >
              {job.logoInitial}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-semibold text-sm">{job.company}</span>
                {job.verified && (
                  <CheckCircle2 size={14} className="text-brand fill-brand" />
                )}
              </div>
              <span className="text-[#888] text-xs">{job.type}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 top-36 bottom-0 p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-white font-bold text-[26px] tracking-[-0.8px] leading-tight">{job.title}</h2>

            <div className="flex flex-col gap-2 mt-3">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#666]" />
                <span className="text-[#aaa] text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={13} className="text-[#666]" />
                <span className="text-[#aaa] text-sm">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-[#666]" />
                <span className="text-[#aaa] text-sm">Posted {job.posted}</span>
              </div>
            </div>

            <p className="text-[#777] text-sm mt-4 leading-relaxed line-clamp-3">
              {job.description}
            </p>
          </div>

          {/* Requirements chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.requirements.slice(0, 3).map(req => (
              <span
                key={req}
                className="bg-dark-3 text-[#888] text-[11px] px-2.5 py-1 rounded-lg"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
