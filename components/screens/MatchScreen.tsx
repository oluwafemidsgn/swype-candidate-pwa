'use client'
import { useEffect, useState } from 'react'
import type { Screen } from '@/lib/types'

const CONFETTI_COLORS = [
  '#0f65ef', '#ffffff', '#ffd700', '#ff6b6b', '#a8ff78',
  '#78ffd6', '#f093fb', '#f5a623', '#43cea2', '#185a9d',
]

function Confetti() {
  const [dots, setDots] = useState<{ x: number; color: string; delay: number; size: number }[]>([])

  useEffect(() => {
    setDots(
      Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 100,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 1.5,
        size: Math.random() * 6 + 4,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="confetti-dot"
          style={{
            left: `${dot.x}%`,
            top: '-10px',
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${1.5 + Math.random()}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function MatchScreen({ go }: { go: (s: Screen) => void }) {
  const [show, setShow] = useState(false)
  useEffect(() => { setTimeout(() => setShow(true), 100) }, [])

  return (
    <div className="flex flex-col h-full bg-dark text-white relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(15,101,239,0.3) 0%, transparent 70%)' }} />
      </div>

      <Confetti />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        {/* Profile circles */}
        <div className="flex items-center gap-6 mb-8 relative">
          {/* Candidate */}
          <div
            className={`w-20 h-20 rounded-full bg-dark-2 border-2 border-[#444] overflow-hidden flex items-center justify-center transition-all duration-500 ${
              show ? 'animate-scale-in-1' : 'opacity-0 scale-0'
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
          </div>

          {/* Connection line SVG */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16">
            {show && (
              <svg width="64" height="16" viewBox="0 0 64 16">
                <line
                  x1="0" y1="8" x2="64" y2="8"
                  stroke="url(#lineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="draw-line-anim"
                />
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0f65ef" />
                    <stop offset="100%" stopColor="#20b06e" />
                  </linearGradient>
                </defs>
              </svg>
            )}
            {/* Heart in centre */}
            {show && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-dark-2 rounded-full flex items-center justify-center border border-[#333]" style={{ animationDelay: '0.7s', animation: 'scale-in 0.3s ease 0.7s both' }}>
                <span className="text-xs">💚</span>
              </div>
            )}
          </div>

          {/* Company */}
          <div
            className={`w-20 h-20 rounded-full bg-brand/20 border-2 border-brand/40 overflow-hidden flex items-center justify-center transition-all duration-500 animate-glow ${
              show ? 'animate-scale-in-2' : 'opacity-0 scale-0'
            }`}
          >
            <span className="text-white font-bold text-2xl">S</span>
          </div>
        </div>

        {/* Text */}
        <div className={`text-center ${show ? 'animate-fade-up' : 'opacity-0'}`}>
          <h1 className="text-[36px] font-bold tracking-[-1.5px] text-white leading-tight">
            It&apos;s a Match! 🎉
          </h1>
          <p className="text-[#aaa] text-sm mt-3 leading-relaxed">
            Seepco liked your profile too.<br />Start a conversation now.
          </p>
        </div>

        {/* Match details card */}
        {show && (
          <div className="mt-6 bg-dark-2 rounded-2xl p-4 w-full animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center font-bold text-white">S</div>
              <div>
                <p className="text-white font-semibold text-sm">Seepco Nigeria</p>
                <p className="text-[#666] text-xs">Sales Assistant · Lagos Island</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className={`px-6 pb-safe pb-8 flex flex-col gap-3 flex-shrink-0 ${show ? 'animate-fade-up' : 'opacity-0'}`}>
        <button
          onClick={() => go('chat')}
          className="w-full bg-brand text-white font-semibold text-base py-4 rounded-2xl active:scale-[0.98] transition-transform"
        >
          Send a Message
        </button>
        <button
          onClick={() => go('job-feed')}
          className="w-full text-[#888] font-medium text-sm py-3 active:opacity-70 transition-opacity"
        >
          Keep Swiping
        </button>
        <p className="text-[#555] text-[11px] text-center">
          Your contact details are not shared until you both agree.
        </p>
      </div>
    </div>
  )
}
