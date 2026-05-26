'use client'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, X, Play, RotateCcw } from 'lucide-react'
import type { Screen } from '@/lib/types'

const TIPS = [
  'Introduce yourself — name, role, and what you bring.',
  'Talk about your top experience and a result you&apos;re proud of.',
  'Say why you&apos;re excited about this type of role.',
]

export default function VideoRecordScreen({ go }: { go: (s: Screen) => void }) {
  const [recording, setRecording] = useState(false)
  const [recorded, setRecorded] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [showTips, setShowTips] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const MAX_DURATION = 120

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= MAX_DURATION - 1) {
            stopRecording()
            return MAX_DURATION
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [recording])

  const startRecording = () => { setRecording(true); setElapsed(0) }
  const stopRecording = () => {
    setRecording(false)
    setRecorded(true)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
  const handleRecord = () => recording ? stopRecording() : startRecording()
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  const progress = (elapsed / MAX_DURATION) * 100

  const circumference = 2 * Math.PI * 28
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      {/* Camera area — dark rectangle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a12] to-black" />

      {/* Simulated camera grid */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute border-[#fff] border-[0.5px]" style={{ top: `${(i + 1) * 11}%`, left: 0, right: 0 }} />
        ))}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute border-[#fff] border-[0.5px]" style={{ left: `${(i + 1) * 15}%`, top: 0, bottom: 0 }} />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-safe px-5 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => go('profile-setup')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <p className="text-white/70 text-sm font-medium">Video Pitch</p>
          <button onClick={() => go('job-feed')} className="text-white/50 text-sm">Skip</button>
        </div>
      </div>

      {/* Tips panel */}
      {showTips && (
        <div className="relative z-10 mx-5 mt-4">
          <div className="bg-black/60 backdrop-blur border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm font-semibold">💡 Recording tips</p>
              <button onClick={() => setShowTips(false)} className="text-white/40">
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {TIPS.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand/20 text-brand text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-white/70 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: tip }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Centre area — face frame */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {!recorded ? (
          <div className="w-48 h-64 rounded-[60px] border-2 border-white/20 flex items-center justify-center relative">
            <p className="text-white/30 text-xs text-center px-4">Position your face here</p>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand rounded-br-2xl" />
          </div>
        ) : (
          /* Preview */
          <div className="flex flex-col items-center gap-5">
            <div className="w-48 h-64 rounded-[40px] bg-dark-2 border border-[#333] flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                <Play size={40} className="text-white/50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <Play size={24} className="text-white ml-1" />
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm">Your {formatTime(elapsed)} video pitch is ready</p>
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="relative z-10 flex flex-col items-center gap-4 mb-6">
        {/* Circular timer */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#333" strokeWidth="3" />
            <circle
              cx="32" cy="32" r="28" fill="none"
              stroke={recording ? '#ef4444' : '#0f65ef'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-xs font-mono font-bold">{formatTime(elapsed)}</p>
          </div>
        </div>
        <p className="text-white/40 text-[11px]">Max 2:00</p>
      </div>

      {/* Record button */}
      <div className="relative z-10 flex flex-col items-center gap-4 pb-safe pb-8 px-6">
        {recorded ? (
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => go('job-feed')}
              className="w-full bg-brand text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform"
            >
              Use This Take
            </button>
            <button
              onClick={() => { setRecorded(false); setElapsed(0) }}
              className="w-full border border-[#444] text-white font-medium py-4 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Record Again
            </button>
            <button onClick={() => go('job-feed')} className="text-[#666] text-sm text-center py-2">
              Skip for Now
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleRecord}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                recording ? 'animate-record' : ''
              }`}
              style={{ background: recording ? '#ef4444' : 'white' }}
            >
              <div className={`rounded-full transition-all ${recording ? 'w-6 h-6 bg-white rounded-md' : 'w-6 h-6 bg-red-500 rounded-full'}`} />
            </button>
            <p className="text-white/40 text-xs">{recording ? 'Tap to stop' : 'Tap to record'}</p>
            <button onClick={() => go('job-feed')} className="text-[#555] text-sm">
              Skip for Now
            </button>
          </>
        )}
      </div>

      {/* Recording indicator */}
      {recording && (
        <div className="absolute top-safe right-5 flex items-center gap-2 z-20 pt-4 mt-4">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white text-xs font-medium">REC</span>
        </div>
      )}
    </div>
  )
}
