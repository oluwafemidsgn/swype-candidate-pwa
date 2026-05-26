'use client'
import type { Screen } from '@/lib/types'

export default function WelcomeScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="screen flex flex-col h-full bg-white relative overflow-hidden">
      {/* Decorative radial gradient behind hero */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '22%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 340, height: 340,
          background: 'radial-gradient(circle, rgba(15,101,239,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Floating accent dots */}
      <div className="absolute top-[17%] right-[11%] w-[11px] h-[11px] rounded-full bg-brand opacity-[0.22] pointer-events-none" />
      <div className="absolute top-[28%] left-[7%] w-[7px] h-[7px] rounded-full bg-brand opacity-[0.16] pointer-events-none" />
      <div className="absolute top-[52%] right-[7%] w-[14px] h-[14px] rounded-full bg-brand opacity-[0.10] pointer-events-none" />
      <div className="absolute top-[44%] left-[10%] w-[9px] h-[9px] rounded-full bg-brand opacity-[0.18] pointer-events-none" />
      <div className="absolute top-[65%] left-[4%] w-[5px] h-[5px] rounded-full bg-brand opacity-[0.28] pointer-events-none" />

      {/* Logo */}
      <div className="px-6 pt-[56px] flex items-center gap-[7px]">
        <div className="w-[8px] h-[8px] rounded-full bg-brand" />
        <span className="font-bold text-[24px] tracking-[-0.72px] text-black">SwypeJobs</span>
      </div>

      {/* Hero text */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
        <div className="text-center font-black leading-[0.87] tracking-[-2.5px] text-black" style={{ fontSize: 90 }}>
          <p>Find</p>
          <p>your</p>
          <p>next</p>
          <p className="text-brand">job</p>
        </div>

        <p className="text-[#606060] text-[18px] tracking-[-0.54px] mt-7 font-normal text-center">
          No stress, Just swipe
        </p>

        {/* Social proof pill */}
        <div className="mt-5 bg-[#f0f6ff] border border-[#cddffb] px-4 py-[7px] rounded-full flex items-center gap-[7px]">
          <div className="w-[6px] h-[6px] rounded-full bg-brand flex-shrink-0" />
          <span className="text-brand text-[12px] tracking-[-0.36px] font-normal">
            50,000+ jobs available in Nigeria
          </span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-6 pb-10 flex flex-col gap-[10px]">
        <button
          onClick={() => go('create-account')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px]"
        >
          Create an account
        </button>
        <button
          onClick={() => go('login')}
          className="w-full border border-[#e0e0e0] text-black text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px]"
        >
          Login
        </button>
      </div>
    </div>
  )
}
