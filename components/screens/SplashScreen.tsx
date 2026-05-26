'use client'
import type { Screen } from '@/lib/types'

export default function SplashScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-brand flex items-center justify-center shadow-lg">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 6C22 6 10 16 10 25C10 31.627 15.373 37 22 37C28.627 37 34 31.627 34 25C34 16 22 6 22 6Z"
                fill="white"
              />
              <circle cx="18" cy="27" r="3" fill="#0f65ef" opacity="0.6" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-[52px] font-bold tracking-[-3px] leading-none text-white">Swype</h1>
            <p className="text-[#666] text-sm mt-2 tracking-[-0.3px]">Find your next job. No stress. No agents.</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="text-center mt-4">
          <p className="text-[#aaa] text-base leading-relaxed">
            Swipe through verified Nigerian employers.<br />
            Apply in seconds. Get hired faster.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-2">
          <div className="text-center">
            <p className="text-white font-bold text-xl">12K+</p>
            <p className="text-[#555] text-xs">Jobs Posted</p>
          </div>
          <div className="w-px bg-[#333]" />
          <div className="text-center">
            <p className="text-white font-bold text-xl">4.2K</p>
            <p className="text-[#555] text-xs">Hired This Month</p>
          </div>
          <div className="w-px bg-[#333]" />
          <div className="text-center">
            <p className="text-white font-bold text-xl">98%</p>
            <p className="text-[#555] text-xs">Verified Employers</p>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 pb-safe flex flex-col gap-3 pb-8">
        <button
          onClick={() => go('signup')}
          className="w-full bg-brand text-white font-semibold text-base py-4 rounded-2xl active:scale-[0.98] transition-transform"
        >
          Create Account
        </button>
        <button
          onClick={() => go('signup')}
          className="w-full text-white font-medium text-base py-4 rounded-2xl border border-[#333] active:scale-[0.98] transition-transform"
        >
          Log In
        </button>
        <p className="text-[#555] text-[11px] text-center mt-1">
          100% free to apply · Anti-fraud verified employers
        </p>
      </div>
    </div>
  )
}
