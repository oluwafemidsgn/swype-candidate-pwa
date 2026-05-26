'use client'
import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import type { Job } from '@/lib/types'

function VerifiedBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" fill="#3b82f6" />
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
  const [pos, setPos]   = useState({ x: 0, rot: 0, opacity: 1 })
  const [drag, setDrag] = useState(false)

  const bind = useDrag(
    ({ active, movement: [mx], velocity: [vx], tap }) => {
      if (tap) { onTap(); return }
      const triggered = Math.abs(mx) > 100 || Math.abs(vx) > 0.5
      const dir = mx > 0 ? 1 : -1
      setDrag(active)
      if (!active && triggered) {
        setPos({ x: dir * 700, rot: dir * 26, opacity: 0 })
        setTimeout(() => { dir > 0 ? onSwipeRight() : onSwipeLeft() }, 260)
      } else if (active) {
        setPos({ x: mx, rot: mx / 18, opacity: 1 })
      } else {
        setPos({ x: 0, rot: 0, opacity: 1 })
      }
    },
    { filterTaps: true, threshold: 6 }
  )

  const applyOpacity = Math.max(0, Math.min(pos.x / 65, 1))
  const passOpacity  = Math.max(0, Math.min(-pos.x / 65, 1))

  const scale = isTop ? 1 : 1 - stackIndex * 0.05
  const ty    = isTop ? 0 : stackIndex * 16

  return (
    <div
      {...(isTop ? bind() : {})}
      className="absolute inset-x-0 mx-auto touch-none select-none"
      style={{
        width: 352,
        transform: isTop
          ? `translateX(${pos.x}px) rotate(${pos.rot}deg)`
          : `scale(${scale}) translateY(${ty}px)`,
        transition: drag ? 'none' : 'transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.28s',
        opacity: pos.opacity,
        zIndex: isTop ? 10 : 10 - stackIndex,
        cursor: isTop ? (drag ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* Stamps */}
      {isTop && (
        <>
          <div
            className="absolute top-8 left-4 z-20 border-[3px] border-emerald-400 rounded-[10px] px-3 py-1 -rotate-[14deg] pointer-events-none"
            style={{ opacity: applyOpacity }}
          >
            <span className="text-emerald-400 font-black text-[18px] tracking-[3px]">APPLY</span>
          </div>
          <div
            className="absolute top-8 right-4 z-20 border-[3px] border-rose-400 rounded-[10px] px-3 py-1 rotate-[14deg] pointer-events-none"
            style={{ opacity: passOpacity }}
          >
            <span className="text-rose-400 font-black text-[18px] tracking-[3px]">PASS</span>
          </div>
        </>
      )}

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{
          height: 548,
          background: 'linear-gradient(170deg, #1a2540 0%, #0f172a 55%)',
          boxShadow: isTop
            ? '0 24px 64px rgba(0,0,0,0.32), 0 6px 20px rgba(0,0,0,0.20)'
            : '0 4px 16px rgba(0,0,0,0.14)',
        }}
      >
        {/* Company-colour bloom */}
        <div
          className="absolute top-0 left-0 right-0 h-[220px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% -10%, ${job.companyColor} 0%, transparent 62%)`,
            opacity: 0.45,
          }}
        />
        {/* Subtle top-right glow */}
        <div
          className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${job.companyColor} 0%, transparent 70%)`,
            opacity: 0.18,
          }}
        />

        {/* ── Content ── */}
        <div className="absolute inset-x-0 top-[44px] px-5">

          {/* Company row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <div
                className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                style={{ background: job.companyColor }}
              >
                <span className="text-[11px] font-black text-[#1a1a2e] tracking-[-0.33px]">
                  {job.companyInitials}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-[5px]">
                  <span className="text-white/80 text-[13px] tracking-[-0.39px] font-normal">{job.company}</span>
                  {job.verified && <VerifiedBadge />}
                </div>
                <div className="flex items-center gap-[5px] mt-[1px]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                    <circle cx="12" cy="10" r="3" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
                  </svg>
                  <span className="text-white/35 text-[11px] tracking-[-0.33px]">{job.location}</span>
                </div>
              </div>
            </div>

            {/* Match pill */}
            <div
              className="px-[10px] py-[5px] rounded-full flex items-center gap-1"
              style={{ background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.35)' }}
            >
              <span className="text-blue-400 text-[13px] tracking-[-0.39px] font-bold">{job.matchPercent}%</span>
              <span className="text-white/30 text-[11px] tracking-[-0.33px]">match</span>
            </div>
          </div>

          {/* Job title */}
          <div
            className="font-black text-white leading-[0.90] mt-5"
            style={{ fontSize: 36, letterSpacing: '-1.08px' }}
          >
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
            <span className="text-white/90 text-[15px] tracking-[-0.45px] font-normal">{job.salary}</span>
            <div className="w-[3px] h-[3px] rounded-full bg-white/25" />
            <span className="text-white/45 text-[13px] tracking-[-0.39px]">{job.jobType}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-[6px] mt-4">
            {job.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-white/65 text-[11px] tracking-[-0.33px] px-3 py-[5px] rounded-full"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="absolute left-5 right-5 h-px"
          style={{ top: 294, background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Role overview */}
        <div className="absolute left-5 right-5 flex flex-col gap-[7px]" style={{ top: 308 }}>
          <p className="text-white/30 text-[10px] tracking-[1.2px] font-normal uppercase">About the role</p>
          <p
            className="text-white/55 text-[13px] tracking-[-0.39px] leading-[1.5] line-clamp-4 overflow-hidden"
          >
            {job.description}
          </p>
        </div>

        {/* Meta info */}
        <div className="absolute left-5 right-5 flex items-center gap-2" style={{ top: 454 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-white/22 text-[11px] tracking-[-0.33px]">{job.postedAt}</span>
          <div className="w-[3px] h-[3px] rounded-full bg-white/20" />
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="7" r="4" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
          </svg>
          <span className="text-white/22 text-[11px] tracking-[-0.33px]">{job.applicants} applicants</span>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(15,23,42,1) 40%, transparent)' }}
        />

        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-[14px] pb-[18px]">
          {/* Pass */}
          <button
            onClick={e => { e.stopPropagation(); onSwipeLeft() }}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid rgba(239,68,68,0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Save */}
          <button
            onClick={e => { e.stopPropagation(); onSave() }}
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{
              background: isSaved ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.10)',
              border: isSaved ? '1.5px solid rgba(59,130,246,0.5)' : '1.5px solid rgba(255,255,255,0.12)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                stroke={isSaved ? '#60a5fa' : 'rgba(255,255,255,0.65)'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isSaved ? 'rgba(96,165,250,0.4)' : 'none'}
              />
            </svg>
          </button>

          {/* Apply */}
          <button
            onClick={e => { e.stopPropagation(); onSwipeRight() }}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{ background: '#0f65ef', boxShadow: '0 4px 16px rgba(15,101,239,0.45)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5 9-10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
