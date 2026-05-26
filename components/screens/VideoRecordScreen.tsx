'use client'
import { useState, useEffect, useRef } from 'react'
import type { Screen } from '@/lib/types'

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center">
          <div
            className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              i < current
                ? 'bg-brand text-white'
                : i === current
                ? 'bg-brand text-white ring-4 ring-brand/20'
                : 'bg-[#f0f0f0] text-[#b0b0b0]'
            }`}
          >
            {i < current ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < 2 && (
            <div className={`w-[24px] h-[2px] transition-all ${i < current ? 'bg-brand' : 'bg-[#e8e8e8]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function VideoRecordScreen({ go }: { go: (s: Screen) => void }) {
  const [recording, setRecording] = useState(false)
  const [recorded, setRecorded]   = useState(false)
  const [elapsed, setElapsed]     = useState(0)
  const [tipsOpen, setTipsOpen]   = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const MAX = 120

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setElapsed(p => {
          if (p >= MAX - 1) { stopRec(); return MAX }
          return p + 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [recording])

  const startRec = () => { setElapsed(0); setRecording(true) }
  const stopRec  = () => {
    setRecording(false)
    setRecorded(true)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const pct = (elapsed / MAX) * 100

  return (
    <div className="screen flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Back */}
        <button
          onClick={() => go('about-you')}
          className="mt-[56px] -ml-1 p-1 flex items-center gap-1 text-[#606060] text-[14px] tracking-[-0.42px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4">
          <StepDots current={1} />
          <div>
            <h1 className="font-bold text-[36px] tracking-[-1.08px] text-black leading-none mt-2">Record your video</h1>
            <p className="text-[#606060] text-[15px] tracking-[-0.45px] leading-[1.5] mt-3">
              A 30-second pitch helps you stand out from the crowd.
            </p>
          </div>
        </div>

        {/* Camera area */}
        <div className="relative mt-5 rounded-[28px] overflow-hidden" style={{ height: 340, background: '#1a1a1a' }}>
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg" />

          {/* Timer badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {recording && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            <div className="bg-black/50 backdrop-blur-sm px-3 py-[5px] rounded-full">
              <span className="text-white text-[13px] tracking-[-0.39px] font-normal tabular-nums">
                {fmt(elapsed)} / 2:00
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {(recording || recorded) && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full bg-brand transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {!recording && !recorded && (
              <>
                {/* Face silhouette */}
                <div className="w-[80px] h-[80px] rounded-full bg-white/10 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                    <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
                  </svg>
                </div>
                <p className="text-white/50 text-[13px] tracking-[-0.39px] text-center px-10">
                  Camera preview will appear here
                </p>
              </>
            )}
            {recording && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500 animate-pulse" />
                <p className="text-white text-[14px] tracking-[-0.42px]">Recording…</p>
              </div>
            )}
            {recorded && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-white text-[14px] tracking-[-0.42px]">Video recorded!</p>
              </div>
            )}
          </div>
        </div>

        {/* Pro tips */}
        <div className="mt-4">
          <button
            onClick={() => setTipsOpen(p => !p)}
            className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-[16px] px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#0f65ef" strokeWidth="1.8" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="#0f65ef" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="#0f65ef" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-black text-[13px] tracking-[-0.39px]">Pro tips before you record</span>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              style={{ transform: tipsOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
            >
              <path d="M6 9l6 6 6-6" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {tipsOpen && (
            <div className="bg-[#f6f6f6] border border-[#e8e8e8] border-t-0 rounded-b-[16px] px-4 pt-2 pb-4 flex flex-col gap-[10px]">
              {[
                'Keep it to 30–60 seconds',
                'Speak clearly and at a steady pace',
                'Mention your key skill and why you want the role',
                'Ensure good lighting — natural light works best',
                'Dress professionally, even for remote roles',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[18px] h-[18px] rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-[1px]">
                    <span className="text-brand text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <span className="text-[#606060] text-[13px] tracking-[-0.39px] leading-[1.4]">{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-6" />
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-10 bg-white">
        {recorded ? (
          <div className="flex gap-3">
            <button
              onClick={() => { setRecorded(false); setElapsed(0) }}
              className="flex-1 border border-[#e0e0e0] text-black text-[15px] tracking-[-0.45px] font-normal py-[14px] rounded-[999px]"
            >
              Retake
            </button>
            <button
              onClick={() => go('upload-documents')}
              className="flex-1 bg-brand text-white text-[15px] tracking-[-0.45px] font-normal py-[14px] rounded-[999px]"
            >
              Use this take
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={() => go('about-you')}
              className="text-[#606060] text-[15px] tracking-[-0.45px] font-normal px-2"
            >
              Back
            </button>
            <button
              onClick={recording ? stopRec : startRec}
              className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all ${
                recording
                  ? 'bg-[#f6f6f6] border-2 border-red-400 animate-record-pulse'
                  : 'bg-brand shadow-lg'
              }`}
            >
              {recording ? (
                <div className="w-7 h-7 bg-red-500 rounded-[6px]" />
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="6" fill="white" />
                </svg>
              )}
            </button>
            <button
              onClick={() => go('upload-documents')}
              className="text-[#606060] text-[15px] tracking-[-0.45px] font-normal px-2"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
