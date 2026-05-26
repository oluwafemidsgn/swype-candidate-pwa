'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="#969696" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="1" y1="1" x2="23" y2="23" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function LoginScreen({ go }: { go: (s: Screen) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="screen flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Back */}
        <button
          onClick={() => go('welcome')}
          className="mt-[56px] -ml-1 p-1 flex items-center gap-1 text-[#606060] text-[14px] tracking-[-0.42px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mt-8">
          <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-none">
            Welcome back
          </h1>
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.5] mt-4 w-[280px]">
            Good to see you again. Let&apos;s find your next opportunity.
          </p>
        </div>

        {/* Fields */}
        <div className="mt-10 flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Email address</p>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-4 py-[14px] text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Password</p>
              <button className="text-brand text-[13px] tracking-[-0.39px]">Forgot password?</button>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-4 py-[14px] pr-12 text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
              />
              <button
                onClick={() => setShowPw(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                style={{ transform: 'translateY(-50%)' }}
              >
                <EyeIcon open={showPw} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-[#f0f0f0]" />
          <span className="text-[#b0b0b0] text-[12px] tracking-[-0.36px]">or continue with</span>
          <div className="flex-1 h-px bg-[#f0f0f0]" />
        </div>

        {/* Google / Apple social */}
        <div className="mt-4 flex gap-3">
          <button className="flex-1 border border-[#e8e8e8] rounded-full py-[12px] flex items-center justify-center gap-2 bg-white">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-black text-[13px] tracking-[-0.39px]">Google</span>
          </button>
          <button className="flex-1 border border-[#e8e8e8] rounded-full py-[12px] flex items-center justify-center gap-2 bg-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="text-black text-[13px] tracking-[-0.39px]">Apple</span>
          </button>
        </div>

        <div className="h-6" />
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10 bg-white">
        <button
          onClick={() => go('job-feed')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px]"
        >
          Login
        </button>
        <p className="text-center text-[13px] text-[#969696] tracking-[-0.39px] mt-4">
          Don&apos;t have an account?{' '}
          <button onClick={() => go('create-account')} className="text-brand font-normal">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
