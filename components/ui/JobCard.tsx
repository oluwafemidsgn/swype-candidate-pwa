'use client'
import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import type { Job } from '@/lib/types'

function VerifiedBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="#0f65ef" />
      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Props = {
  job: Job
  isTop: boolean
  stackIndex: number
  isSaved: boolean
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSave: () => void
  onTap: () => void
}

export default function JobCard({
  job, isTop, stackIndex, isSaved,
  onSwipeLeft, onSwipeRight, onSave, onTap,
}: Props) {
  const [pos, setPos]       = useState({ x: 0, rot: 0, opacity: 1 })
  const [dragging, setDrag] = useState(false)

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], tap }) => {
      if (tap) { onTap(); return }
      const triggered = Math.abs(mx) > 100 || Math.abs(vx) > 0.5
      const dir = mx > 0 ? 1 : -1
      setDrag(active)

      if (!active && triggered) {
        setPos({ x: dir * 700, rot: dir * 28, opacity: 0 })
        setTimeout(() => { dir > 0 ? onSwipeRight() : onSwipeLeft() }, 260)
      } else if (active) {
        setPos({ x: mx, rot: mx / 18, opacity: 1 })
      } else {
        setPos({ x: 0, rot: 0, opacity: 1 })
      }
    },
    { filterTaps: true, threshold: 6 }
  )

  const applyOpacity = Math.max(0, Math.min(pos.x / 70, 1))
  const passOpacity  = Math.max(0, Math.min(-pos.x / 70, 1))

  const scale = isTop ? 1 : 1 - stackIndex * 0.04
  const ty    = isTop ? 0 : stackIndex * 14

  return (
    <div
      {...(isTop ? bind() : {})}
      className="absolute inset-x-0 mx-auto touch-none select-none"
      style={{
        width: 352,
        transform: isTop
          ? `translateX(${pos.x}px) rotate(${pos.rot}deg)`
          : `scale(${scale}) translateY(${ty}px)`,
        transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.28s',
        opacity: pos.opacity,
        zIndex: isTop ? 10 : 10 - stackIndex,
        cursor: isTop ? (dragging ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* APPLY / PASS stamps */}
      {isTop && (
        <>
          <div
            className="absolute top-8 left-5 z-20 border-[3px] border-green-500 rounded-[10px] px-3 py-[4px] -rotate-[15deg] pointer-events-none"
            style={{ opacity: applyOpacity }}
          >
            <span className="text-green-500 font-black text-[18px] tracking-[3px] uppercase">Apply</span>
          </div>
          <div
            className="absolute top-8 right-5 z-20 border-[3px] border-red-400 rounded-[10px] px-3 py-[4px] rotate-[15deg] pointer-events-none"
            style={{ opacity: passOpacity }}
          >
            <span className="text-red-400 font-black text-[18px] tracking-[3px] uppercase">Pass</span>
          </div>
        </>
      )}

      {/* Card body */}
      <div
        className="rounded-[24px] overflow-hidden relative"
        style={{ height: 548, background: '#f6f6f6', boxShadow: isTop ? '0 8px 32px rgba(0,0,0,0.09)' : 'none' }}
      >
        {/* Wave header */}
        <div className="card-wave absolute top-[-50px] left-[-2px] w-[390px] h-[185px] pointer-events-none" />

        {/* Radial accent */}
        <div
          className="absolute top-[-40px] right-[-70px] w-[290px] h-[110px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(184,206,248,0.5) 0%, transparent 70%)', transform: 'scaleY(-1)' }}
        />

        {/* Content area */}
        <div className="absolute inset-x-0 top-[44px] px-5">
          {/* Company row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Company logo */}
              <div
                className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: job.companyColor }}
              >
                <span className="text-[11px] font-bold text-[#3a3a3a] tracking-[-0.33px]">
                  {job.companyInitials}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-[4px]">
                  <span className="text-black text-[13px] tracking-[-0.39px] font-normal">{job.company}</span>
                  {job.verified && <VerifiedBadge />}
                </div>
                <span className="text-[#969696] text-[11px] tracking-[-0.33px]">{job.location}</span>
              </div>
            </div>
            <div className="bg-white px-[10px] py-[5px] rounded-full shadow-sm">
              <span className="text-brand text-[12px] tracking-[-0.36px] font-bold">{job.matchPercent}%</span>
              <span className="text-[#969696] text-[11px] tracking-[-0.33px]"> match</span>
            </div>
          </div>

          {/* Job title */}
          <div className="font-black text-[34px] tracking-[-1.02px] text-black leading-[0.92] mt-4">
            {job.title.split(' ').length > 1 ? (
              <>
                <p>{job.title.split(' ').slice(0, -1).join(' ')}</p>
                <p>{job.title.split(' ').slice(-1)[0]}</p>
              </>
            ) : (
              <p>{job.title}</p>
            )}
          </div>

          {/* Salary + type */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-black text-[14px] tracking-[-0.42px] font-normal">{job.salary}</span>
            <div className="w-1 h-1 rounded-full bg-[#c0c0c0]" />
            <span className="text-[#606060] text-[13px] tracking-[-0.39px]">{job.jobType}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[6px] mt-4">
            {job.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="bg-[#e8f0fc] text-[#3a6cc0] text-[11px] tracking-[-0.33px] px-3 py-[5px] rounded-full font-normal"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Role overview */}
        <div className="absolute left-5 right-5 flex flex-col gap-[6px]" style={{ top: 290 }}>
          <p className="font-bold text-[#3a3a3a] text-[13px] tracking-[-0.39px]">Role overview</p>
          <p className="text-[#606060] text-[13px] tracking-[-0.39px] leading-[1.45] line-clamp-4">
            {job.description}
          </p>
        </div>

        {/* Posted info */}
        <div className="absolute left-5 right-5 flex items-center gap-2" style={{ top: 452 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#b0b0b0" strokeWidth="1.8" />
            <path d="M12 6v6l4 2" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="text-[#b0b0b0] text-[11px] tracking-[-0.33px]">{job.postedAt}</span>
          <div className="w-1 h-1 rounded-full bg-[#d0d0d0]" />
          <span className="text-[#b0b0b0] text-[11px] tracking-[-0.33px]">{job.applicants} applicants</span>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-[14px] pb-5">
          {/* Pass */}
          <button
            onClick={e => { e.stopPropagation(); onSwipeLeft() }}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
            style={{ background: '#fee2e2' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Save */}
          <button
            onClick={e => { e.stopPropagation(); onSave() }}
            className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                stroke={isSaved ? '#0f65ef' : '#606060'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isSaved ? '#0f65ef' : 'none'}
              />
            </svg>
          </button>

          {/* Apply */}
          <button
            onClick={e => { e.stopPropagation(); onSwipeRight() }}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
            style={{ background: '#dcfce7' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5 9-10" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
