'use client'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Screen } from '@/lib/types'

export default function VideoRecordScreen({ go }: { go: (s: Screen) => void }) {
  const [recording, setRecording] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const MAX = 120

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setElapsed(p => { if (p >= MAX - 1) { stop(); return MAX } return p + 1 })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [recording])

  const start = () => { setElapsed(0); setRecording(true) }
  const stop  = () => { setRecording(false); setRecorded(true); if (intervalRef.current) clearInterval(intervalRef.current) }
  const fmt   = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="flex flex-col h-full bg-white px-6">
      {/* Header */}
      <div className="mt-[99px] flex flex-col gap-[15px] w-[375px]">
        <div className="bg-[#d0e1fd] self-start px-4 py-1 rounded-full">
          <span className="text-[#606060] text-[12px] tracking-[-0.36px] font-normal">Step 2 of 3</span>
        </div>
        <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-none">Record your video</h1>
        <p className="text-[#606060] text-[17px] tracking-[-0.51px] leading-[1.4]">
          Record your pitch video to convince us.
        </p>
      </div>

      {/* Camera area */}
      <div className="relative mt-[24px] bg-[#f6f6f6] rounded-[35px] h-[400px] w-full flex items-center justify-center">
        {/* Timer badge */}
        <div className="absolute top-4 right-4 bg-[#d0e1fd] px-4 py-1 rounded-full">
          <span className="text-[#606060] text-[12px] tracking-[-0.36px] font-normal">
            {recorded ? fmt(elapsed) : recording ? fmt(elapsed) : '2:00'}
          </span>
        </div>

        {/* Center content */}
        {!recording && !recorded && (
          <p className="text-[#969696] text-sm text-center px-8">Camera preview will appear here</p>
        )}
        {recording && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="text-[#606060] text-sm">Recording…</p>
          </div>
        )}
        {recorded && (
          <p className="text-[#606060] text-sm">Video recorded ✓</p>
        )}
      </div>

      {/* Pro tips row */}
      <div className="mt-[16px] bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 flex items-center justify-between">
        <p className="text-[#969696] text-[12px] tracking-[-0.36px] font-normal">Pro tips before you hit record</p>
        <ChevronDown size={16} className="text-[#969696]" />
      </div>

      <div className="flex-1" />

      {/* Bottom actions */}
      {recorded ? (
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => { setRecorded(false); setElapsed(0) }}
            className="flex-1 border border-[#e4e4e4] text-black text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] active:opacity-70 transition-opacity"
          >
            Retake
          </button>
          <button
            onClick={() => go('upload-documents')}
            className="flex-1 bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] active:opacity-80 transition-opacity"
          >
            Use this take
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => go('about-you')} className="text-[#606060] text-[17px] tracking-[-0.51px] font-normal">
            Back
          </button>
          <button
            onClick={recording ? stop : start}
            className={`w-[76px] h-[76px] rounded-full bg-[#f6f6f6] border-2 flex items-center justify-center transition-all active:scale-95 ${recording ? 'animate-record-pulse border-red-400' : 'border-transparent'}`}
          >
            <div className={`rounded-full transition-all ${recording ? 'w-8 h-8 bg-red-500' : 'w-10 h-10 bg-[#d0d0d0]'}`} />
          </button>
          <button onClick={() => go('upload-documents')} className="text-[#606060] text-[17px] tracking-[-0.51px] font-normal">
            Skip
          </button>
        </div>
      )}
    </div>
  )
}
