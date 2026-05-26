'use client'
import { useState } from 'react'
import { useDrag } from '@use-gesture/react'
import type { Job } from '@/lib/types'

function VerifiedBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="6.5" fill="#0f65ef" />
      <path d="M3.5 6.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
      const triggered = Math.abs(mx) > 90 || Math.abs(vx) > 0.5
      const dir = mx > 0 ? 1 : -1
      setDrag(active)
      if (!active && triggered) {
        setPos({ x: dir * 700, rot: dir * 24, opacity: 0 })
        setTimeout(() => { dir > 0 ? onSwipeRight() : onSwipeLeft() }, 260)
      } else if (active) {
        setPos({ x: mx, rot: mx / 20, opacity: 1 })
      } else {
        setPos({ x: 0, rot: 0, opacity: 1 })
      }
    },
    { filterTaps: true, threshold: 6 }
  )

  const applyOpacity = Math.max(0, Math.min(pos.x / 60, 1))
  const passOpacity  = Math.max(0, Math.min(-pos.x / 60, 1))

  const scale = isTop ? 1 : 1 - stackIndex * 0.045
  const ty    = isTop ? 0 : stackIndex * 14

  /* Responsive: fit within the available flex-1 area on any phone */
  const cardH = 'min(455px, calc(100svh - 295px))'
  const cardW = 'min(352px, calc(100% - 28px))'

  return (
    <div
      {...(isTop ? bind() : {})}
      className="absolute inset-x-0 mx-auto touch-none select-none"
      style={{
        width: cardW,
        transform: isTop
          ? `translateX(${pos.x}px) rotate(${pos.rot}deg)`
          : `scale(${scale}) translateY(${ty}px)`,
        transition: drag ? 'none' : 'transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.26s',
        opacity: pos.opacity,
        zIndex: isTop ? 10 : 10 - stackIndex,
        cursor: isTop ? (drag ? 'grabbing' : 'grab') : 'default',
      }}
    >
      {/* APPLY / PASS stamps */}
      {isTop && (
        <>
          <div
            className="absolute top-[52px] left-4 z-20 border-[2.5px] border-emerald-500 rounded-[10px] px-3 py-[5px] -rotate-[14deg] pointer-events-none"
            style={{ opacity: applyOpacity }}
          >
            <span className="text-emerald-500 font-black text-[16px] tracking-[2.5px]">APPLY</span>
          </div>
          <div
            className="absolute top-[52px] right-4 z-20 border-[2.5px] border-rose-500 rounded-[10px] px-3 py-[5px] rotate-[14deg] pointer-events-none"
            style={{ opacity: passOpacity }}
          >
            <span className="text-rose-500 font-black text-[16px] tracking-[2.5px]">PASS</span>
          </div>
        </>
      )}

      {/* Card shell — flex column fills the responsive height */}
      <div
        className="rounded-[24px] overflow-hidden bg-white flex flex-col"
        style={{
          height: cardH,
          boxShadow: isTop
            ? '0 16px 48px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.07)'
            : '0 2px 10px rgba(0,0,0,0.06)',
        }}
      >
        {/* ── Header with company colour wash ── */}
        <div
          className="flex-shrink-0 px-5 pt-5 pb-4"
          style={{
            background: `linear-gradient(140deg, ${job.companyColor}80 0%, ${job.companyColor}28 55%, rgba(255,255,255,0) 100%)`,
          }}
        >
          {/* Company logo row */}
          <div className="flex items-start justify-between">
            <div
              className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center flex-shrink-0"
              style={{ background: job.companyColor, boxShadow: `0 4px 12px ${job.companyColor}80` }}
            >
              <span className="text-[12px] font-black text-[#1a1a2e] tracking-[-0.36px]">
                {job.companyInitials}
              </span>
            </div>

            {/* Match pill */}
            <div className="bg-white/80 backdrop-blur-sm px-[10px] py-[6px] rounded-full flex items-center gap-[5px]"
              style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div className="w-[6px] h-[6px] rounded-full bg-brand" />
              <span className="text-brand text-[13px] font-bold tracking-[-0.39px]">{job.matchPercent}%</span>
              <span className="text-[#969696] text-[11px] tracking-[-0.33px]">match</span>
            </div>
          </div>

          {/* Company info */}
          <div className="mt-[10px]">
            <div className="flex items-center gap-[5px]">
              <span className="text-[#2a2a2a] text-[13px] tracking-[-0.39px] font-normal">{job.company}</span>
              {job.verified && <VerifiedBadge />}
            </div>
            <div className="flex items-center gap-[5px] mt-[3px]">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#b0b0b0" strokeWidth="2.2" />
                <circle cx="12" cy="10" r="3" stroke="#b0b0b0" strokeWidth="2.2" />
              </svg>
              <span className="text-[#b0b0b0] text-[12px] tracking-[-0.36px]">{job.location} · {job.jobType}</span>
            </div>
          </div>
        </div>

        {/* ── Job title + salary ── */}
        <div className="flex-shrink-0 px-5 pt-[14px]">
          <h2
            className="font-black text-black leading-[0.93]"
            style={{ fontSize: 30, letterSpacing: '-0.9px' }}
          >
            {job.title}
          </h2>
          <div className="flex items-center gap-[7px] mt-[8px]">
            <span className="text-black text-[14px] tracking-[-0.42px] font-normal">{job.salary}</span>
            <div className="w-[3px] h-[3px] rounded-full bg-[#d8d8d8]" />
            <span className="text-[#969696] text-[12px] tracking-[-0.36px]">{job.experience} exp</span>
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="flex-shrink-0 flex flex-wrap gap-[6px] px-5 mt-[10px]">
          {job.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[#3a6cc0] text-[11px] tracking-[-0.33px] px-[10px] py-[4px] rounded-full"
              style={{ background: '#eef3fe' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="flex-shrink-0 mx-5 mt-[12px] h-px bg-[#f0f0f0]" />

        {/* ── Role overview (flex-1 fills remaining space) ── */}
        <div className="flex-1 min-h-0 px-5 pt-[10px] overflow-hidden">
          <p className="text-[#b8b8b8] text-[10px] tracking-[0.8px] uppercase mb-[6px]">About the role</p>
          <p className="text-[#606060] text-[13px] tracking-[-0.39px] leading-[1.55] line-clamp-3">
            {job.description}
          </p>
        </div>

        {/* ── Meta ── */}
        <div className="flex-shrink-0 px-5 mt-[6px] flex items-center gap-[6px]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#d0d0d0" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="#d0d0d0" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[#c8c8c8] text-[11px] tracking-[-0.33px]">{job.postedAt}</span>
          <div className="w-[3px] h-[3px] rounded-full bg-[#e0e0e0]" />
          <span className="text-[#c8c8c8] text-[11px] tracking-[-0.33px]">{job.applicants} applicants</span>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex-shrink-0 px-5 pt-[10px] pb-5 flex items-center gap-[10px]">
          {/* Pass */}
          <button
            onClick={e => { e.stopPropagation(); onSwipeLeft() }}
            className="w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
            style={{ background: '#fff0f0', border: '1.5px solid #ffd6d6' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Save */}
          <button
            onClick={e => { e.stopPropagation(); onSave() }}
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
            style={{
              background: isSaved ? '#eff6ff' : '#f6f6f6',
              border: `1.5px solid ${isSaved ? '#bfdbfe' : '#eaeaea'}`,
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                stroke={isSaved ? '#0f65ef' : '#909090'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isSaved ? 'rgba(15,101,239,0.15)' : 'none'}
              />
            </svg>
          </button>

          {/* Apply — full width pill */}
          <button
            onClick={e => { e.stopPropagation(); onSwipeRight() }}
            className="flex-1 h-[46px] rounded-full bg-brand flex items-center justify-center gap-[7px] transition-transform active:scale-[0.97]"
            style={{ boxShadow: '0 4px 14px rgba(15,101,239,0.32)' }}
          >
            <span className="text-white text-[14px] tracking-[-0.42px] font-normal">Apply now</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
