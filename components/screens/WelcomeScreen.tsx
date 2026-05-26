'use client'
import type { Screen } from '@/lib/types'

export default function WelcomeScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-white px-6">
      {/* App name */}
      <p className="text-center font-bold text-[32px] tracking-[-0.96px] text-black mt-[60px]">
        SwypeJobs
      </p>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center font-black text-[96px] leading-[0.9] tracking-[-1.92px] text-black">
          <p>Find</p>
          <p>your</p>
          <p>next</p>
          <p>job</p>
        </div>
        <p className="text-[#606060] text-[20px] tracking-[-0.6px] mt-8 font-normal">
          No stress, Just swipe
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 pb-10">
        <button
          onClick={() => go('create-account')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] active:opacity-80 transition-opacity"
        >
          Create an account
        </button>
        <button
          onClick={() => go('create-account')}
          className="w-full border border-[#e4e4e4] text-black text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] active:opacity-70 transition-opacity"
        >
          Login
        </button>
      </div>
    </div>
  )
}
