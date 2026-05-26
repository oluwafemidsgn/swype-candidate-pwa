'use client'
import { useState, useRef } from 'react'
import type { Screen } from '@/lib/types'

export default function OtpAccountScreen({ go }: { go: (s: Screen) => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtp = (i: number, val: string) => {
    if (val.length > 1) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
  }
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  return (
    <div className="flex flex-col h-full bg-white px-6 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="mt-[89px]">
        <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-none w-[210px]">
          Create your account
        </h1>
        <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4] mt-4 w-[282px]">
          Hey, welcome to swype where you find the right job to match your swype.
        </p>
      </div>

      {/* OTP */}
      <div className="mt-[32px] flex flex-col gap-[10px]">
        <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">Enter otp code</p>
        <div className="flex gap-2">
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
              className="w-12 h-12 bg-[#f6f6f6] border border-[#ddd] rounded-full text-center text-[12px] tracking-[-0.36px] text-[#969696] outline-none focus:border-brand font-normal"
            />
          ))}
        </div>
      </div>

      {/* Account fields */}
      <div className="mt-[20px] flex flex-col gap-[10px]">
        {/* Fullname */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">Fullname</p>
          <input
            type="text"
            placeholder="Name example"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 text-[12px] tracking-[-0.36px] text-black placeholder-[#969696] outline-none font-normal"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">Email address</p>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 text-[12px] tracking-[-0.36px] text-black placeholder-[#969696] outline-none font-normal"
          />
        </div>
        {/* Password */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">Password</p>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 text-[12px] tracking-[-0.36px] text-black placeholder-[#969696] outline-none font-normal"
          />
        </div>
      </div>

      <div className="flex-1 min-h-[24px]" />

      <button
        onClick={() => go('about-you')}
        className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] mb-10 active:opacity-80 transition-opacity"
      >
        Continue
      </button>
    </div>
  )
}
