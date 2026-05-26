'use client'
import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import type { Job } from '@/lib/types'

/* Blue verified-badge SVG */
function VerifiedBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="7.5" fill="#0f65ef" />
      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Props = {
  job: Job
  isTop: boolean
  stackIndex: number
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export default function JobCard({ job, isTop, stackIndex, onSwipeLeft, onSwipeRight }: Props) {
  const [pos, setPos] = useState({ x: 0, rot: 0, opacity: 1 })
  const [dragging, setDragging] = useState(false)

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx] }) => {
      const triggered = Math.abs(mx) > 120 || Math.abs(vx) > 0.5
      const dir = mx > 0 ? 1 : -1
      setDragging(active)

      if (!active && triggered) {
        setPos({ x: dir * 700, rot: dir * 30, opacity: 0 })
        setTimeout(() => { dir > 0 ? onSwipeRight() : onSwipeLeft() }, 280)
      } else if (active) {
        setPos({ x: mx, rot: mx / 16, opacity: 1 })
      } else {
        setPos({ x: 0, rot: 0, opacity: 1 })
      }
    },
    { filterTaps: true, threshold: 8 }
  )

  const applyOpacity = Math.max(0, Math.min(pos.x / 80, 1))
  const passOpacity  = Math.max(0, Math.min(-pos.x / 80, 1))

  const scale = isTop ? 1 : 1 - stackIndex * 0.04
  const ty    = isTop ? 0 : stackIndex * 12

  return (
    <div
      {...(isTop ? bind() : {})}
      className="absolute inset-x-0 mx-auto touch-none select-none"
      style={{
        width: 352,
        transform: isTop
          ? `translateX(${pos.x}px) rotate(${pos.rot}deg)`
          : `scale(${scale}) translateY(${ty}px)`,
        transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s',
        opacity: pos.opacity,
        zIndex: isTop ? 10 : 10 - stackIndex,
        cursor: isTop ? (dragging ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* APPLY / PASS overlays */}
      {isTop && (
        <>
          <div className="absolute top-10 left-5 z-20 border-[3px] border-green-500 rounded-xl px-3 py-1 -rotate-12 pointer-events-none" style={{ opacity: applyOpacity }}>
            <span className="text-green-500 font-bold text-lg tracking-widest">APPLY</span>
          </div>
          <div className="absolute top-10 right-5 z-20 border-[3px] border-red-400 rounded-xl px-3 py-1 rotate-12 pointer-events-none" style={{ opacity: passOpacity }}>
            <span className="text-red-400 font-bold text-lg tracking-widest">PASS</span>
          </div>
        </>
      )}

      {/* Card */}
      <div className="bg-[#f6f6f6] rounded-[24px] overflow-hidden relative" style={{ height: 543 }}>

        {/* Wave header */}
        <div className="card-wave absolute top-[-46px] left-[-1px] w-[386px] h-[178px] pointer-events-none" />

        {/* Ellipse accent */}
        <div
          className="absolute top-[-35px] right-[-60px] w-[280px] h-[108px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #b8ccf8 0%, transparent 70%)', transform: 'scaleY(-1)' }}
        />

        {/* Card content */}
        <div className="absolute inset-x-0 top-[47px] px-6 flex flex-col gap-6">
          {/* Company row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-[3px]">
              <span className="text-[#606060] text-[14px] tracking-[-0.42px] font-normal">{job.company}</span>
              {job.verified && <VerifiedBadge />}
            </div>
            <div className="bg-white px-2 py-1 rounded-full">
              <span className="text-[#606060] text-[12px] tracking-[-0.36px] font-normal">Match: {job.matchPercent}%</span>
            </div>
          </div>

          {/* Job title */}
          <div className="font-bold text-[36px] text-black tracking-[-1.08px] leading-none">
            {job.title.includes(' ') ? (
              <>
                <p>{job.title.split(' ').slice(0, -1).join(' ')}</p>
                <p>{job.title.split(' ').slice(-1)[0]}</p>
              </>
            ) : (
              <p>{job.title}</p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map(tag => (
              <span key={tag} className="bg-[#e8f0fc] text-[#606060] text-[10px] tracking-[-0.3px] px-4 py-1 rounded-full font-normal">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Role overview */}
        <div className="absolute left-6 right-6 flex flex-col gap-2" style={{ top: 275 }}>
          <p className="font-bold text-[#606060] text-[14px] tracking-[-0.42px]">Role overview</p>
          <p className="text-[#606060] text-[14px] tracking-[-0.42px] leading-[1.4] line-clamp-5 overflow-hidden">
            {job.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 pb-6">
          <button
            onClick={e => { e.stopPropagation(); onSwipeLeft() }}
            className="bg-[#f8abab] p-4 rounded-full active:scale-90 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e05555" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation() }}
            className="bg-white p-4 rounded-full shadow active:scale-90 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#606060" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); onSwipeRight() }}
            className="bg-[#a3f096] p-4 rounded-full active:scale-90 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#3d8a31" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
