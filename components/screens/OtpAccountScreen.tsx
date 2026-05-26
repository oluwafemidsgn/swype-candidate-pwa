'use client'
import { useState, useRef, useEffect } from 'react'
import type { Screen } from '@/lib/types'

export default function OtpAccountScreen({ go }: { go: (s: Screen) => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [countdown, setCountdown] = useState(59)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(p => p - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleOtp = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
  }
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length > 0) {
      const next = [...otp]
      pasted.split('').forEach((ch, idx) => { if (idx < 6) next[idx] = ch })
      setOtp(next)
      otpRefs.current[Math.min(pasted.length, 5)]?.focus()
    }
    e.preventDefault()
  }

  const otpFilled = otp.every(d => d !== '')

  return (
    <div className="screen flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Back */}
        <button
          onClick={() => go('create-account')}
          className="mt-[56px] -ml-1 p-1 flex items-center gap-1 text-[#606060] text-[14px] tracking-[-0.42px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mt-8">
          <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-[1.05] w-[220px]">
            Create your account
          </h1>
          <p className="text-[#606060] text-[15px] tracking-[-0.45px] leading-[1.5] mt-4">
            We sent a 6-digit code to <span className="text-black font-normal">+234 916 *** 9900</span>
          </p>
        </div>

        {/* OTP boxes */}
        <div className="mt-8 flex flex-col gap-[10px]">
          <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Verification code</p>
          <div className="flex gap-[10px]" onPaste={handleOtpPaste}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={el => { otpRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleOtp(i, e.target.value)}
                onKeyDown={e => handleOtpKey(i, e)}
                className={`w-[46px] h-[52px] rounded-[14px] text-center text-[20px] tracking-[-0.6px] font-bold outline-none transition-all ${
                  d
                    ? 'bg-brand text-white border-2 border-brand'
                    : 'bg-[#f6f6f6] border-2 border-[#e8e8e8] text-black focus:border-brand'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            {countdown > 0 ? (
              <p className="text-[#969696] text-[13px] tracking-[-0.39px]">
                Resend code in <span className="text-black">0:{String(countdown).padStart(2, '0')}</span>
              </p>
            ) : (
              <button
                onClick={() => setCountdown(59)}
                className="text-brand text-[13px] tracking-[-0.39px]"
              >
                Resend code
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-[#f0f0f0]" />
          <span className="text-[#c0c0c0] text-[12px] tracking-[-0.36px]">Account details</span>
          <div className="flex-1 h-px bg-[#f0f0f0]" />
        </div>

        {/* Account fields */}
        <div className="mt-5 flex flex-col gap-[14px] pb-6">
          {/* Name */}
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Full name</p>
            <input
              type="text" placeholder="e.g. Adebayo Okafor"
              value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-4 py-[14px] text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Email address</p>
            <input
              type="email" placeholder="name@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-4 py-[14px] text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
            />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Password</p>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} placeholder="Create a strong password"
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-4 py-[14px] pr-12 text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
              />
              <button
                onClick={() => setShowPw(p => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ transform: 'translateY(-50%)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="3" stroke="#969696" strokeWidth="1.8" />
                  {!showPw && <line x1="1" y1="1" x2="23" y2="23" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 bg-white">
        <button
          onClick={() => go('about-you')}
          className={`w-full text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px] transition-opacity ${
            otpFilled ? 'bg-brand text-white' : 'bg-[#f6f6f6] text-[#b0b0b0]'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
