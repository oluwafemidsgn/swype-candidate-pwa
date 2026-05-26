'use client'
import { useEffect, useState } from 'react'
import type { Screen } from '@/lib/types'

export default function ProfileCompleteScreen({ go }: { go: (s: Screen) => void }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="screen flex flex-col h-full bg-white px-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Animated check circle */}
        <div
          className="relative w-[100px] h-[100px] rounded-full bg-[#f0f9f4] flex items-center justify-center mb-8 transition-all duration-500"
          style={{ transform: show ? 'scale(1)' : 'scale(0.6)', opacity: show ? 1 : 0 }}
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-green-500/20" />
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M12 24l9 9 15-18"
              stroke="#22c55e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 60,
                strokeDashoffset: show ? 0 : 60,
                transition: 'stroke-dashoffset 0.6s ease 0.3s',
              }}
            />
          </svg>
          {/* Decorative dots */}
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand/20" />
          <div className="absolute -bottom-2 right-2 w-3 h-3 rounded-full bg-green-400/30" />
          <div className="absolute top-1 -left-2 w-2.5 h-2.5 rounded-full bg-brand/15" />
        </div>

        {/* Text */}
        <h1
          className="font-bold text-[32px] tracking-[-0.96px] text-black leading-[1.1] transition-all duration-500 delay-200"
          style={{ transform: show ? 'translateY(0)' : 'translateY(16px)', opacity: show ? 1 : 0 }}
        >
          You&apos;re all set!
        </h1>
        <p
          className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.5] mt-3 w-[260px] transition-all duration-500 delay-300"
          style={{ transform: show ? 'translateY(0)' : 'translateY(16px)', opacity: show ? 1 : 0 }}
        >
          Your profile is live. Let&apos;s find your perfect job match.
        </p>

        {/* Stats row */}
        <div
          className="flex items-center gap-5 mt-8 transition-all duration-500 delay-400"
          style={{ transform: show ? 'translateY(0)' : 'translateY(16px)', opacity: show ? 1 : 0 }}
        >
          {[
            { value: '3 min', label: 'Setup time' },
            { value: '6', label: 'Jobs matched' },
            { value: '50K+', label: 'Total jobs' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-bold text-[22px] tracking-[-0.66px] text-black">{value}</span>
              <span className="text-[#969696] text-[12px] tracking-[-0.36px]">{label}</span>
            </div>
          ))}
        </div>

        {/* Profile pill */}
        <div
          className="mt-8 bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-4 py-3 flex items-center gap-3 transition-all duration-500 delay-500"
          style={{ transform: show ? 'translateY(0)' : 'translateY(16px)', opacity: show ? 1 : 0 }}
        >
          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[13px] font-bold tracking-[-0.39px]">AO</span>
          </div>
          <div className="text-left">
            <p className="text-black text-[14px] tracking-[-0.42px] font-normal leading-none">Adebayo Okafor</p>
            <p className="text-[#969696] text-[12px] tracking-[-0.36px] mt-[2px]">Product Designer · Lagos</p>
          </div>
          <div className="ml-auto">
            <div className="bg-green-50 border border-green-200 px-2 py-1 rounded-full">
              <span className="text-green-600 text-[11px] tracking-[-0.33px]">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        className="pb-10 transition-all duration-500 delay-600"
        style={{ transform: show ? 'translateY(0)' : 'translateY(16px)', opacity: show ? 1 : 0 }}
      >
        <button
          onClick={() => go('job-feed')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px]"
        >
          Start finding jobs
        </button>
      </div>
    </div>
  )
}
