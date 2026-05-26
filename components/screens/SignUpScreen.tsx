'use client'
import { useState, useRef } from 'react'
import { Eye, EyeOff, ChevronLeft } from 'lucide-react'
import type { Screen } from '@/lib/types'

export default function SignUpScreen({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return
    const next = [...otp]
    next[index] = val
    setOtp(next)
    if (val && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKey = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  if (step === 'otp') {
    return (
      <div className="flex flex-col h-full bg-dark text-white px-6 pt-safe">
        <div className="pt-4 pb-2">
          <button onClick={() => setStep('form')} className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2">
            <ChevronLeft size={20} className="text-white" />
          </button>
        </div>

        <div className="mt-8">
          <h1 className="text-[32px] font-bold tracking-[-1.5px] text-white leading-tight">Verify your<br />number</h1>
          <p className="text-[#888] text-sm mt-3 leading-relaxed">
            Enter the 6-digit code sent to<br />
            <span className="text-white font-medium">+234 {phone || '08XXXXXXXXX'}</span>
          </p>
        </div>

        {/* OTP boxes */}
        <div className="flex gap-3 mt-10 justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { otpRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(i, e.target.value)}
              onKeyDown={e => handleOtpKey(i, e)}
              className="w-12 h-14 bg-dark-2 border border-[#333] rounded-2xl text-center text-white text-xl font-bold focus:border-brand outline-none transition-colors"
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#555] text-sm">
            Didn&apos;t receive code?{' '}
            {timer > 0 ? (
              <span className="text-[#888]">Resend in {timer}s</span>
            ) : (
              <button className="text-brand font-medium" onClick={() => setTimer(30)}>Resend code</button>
            )}
          </p>
        </div>

        <div className="flex-1" />
        <div className="pb-safe pb-8">
          <button
            onClick={() => go('profile-setup')}
            className="w-full bg-brand text-white font-semibold text-base py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            Verify &amp; Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      <div className="px-6 pt-safe">
        <div className="pt-4 pb-2">
          <button onClick={() => go('splash')} className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2">
            <ChevronLeft size={20} className="text-white" />
          </button>
        </div>

        <div className="mt-6">
          <h1 className="text-[32px] font-bold tracking-[-1.5px] text-white leading-tight">Create your<br />account</h1>
          <p className="text-[#888] text-sm mt-3">No CV required. Just you.</p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          {/* Phone */}
          <div>
            <label className="text-[#aaa] text-sm mb-2 block">Phone number</label>
            <div className="flex gap-2">
              <div className="bg-dark-2 border border-[#333] rounded-xl px-4 flex items-center">
                <span className="text-[#888] text-sm font-medium">+234</span>
              </div>
              <input
                type="tel"
                placeholder="08100000000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="flex-1 bg-dark-2 border border-[#333] rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#555] focus:border-brand outline-none transition-colors"
              />
            </div>
          </div>

          {/* Full name */}
          <div>
            <label className="text-[#aaa] text-sm mb-2 block">Full name</label>
            <input
              type="text"
              placeholder="Adewale Okonkwo"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-dark-2 border border-[#333] rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#555] focus:border-brand outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[#aaa] text-sm mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-dark-2 border border-[#333] rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-[#555] focus:border-brand outline-none transition-colors"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div
              onClick={() => setAgreed(!agreed)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                agreed ? 'bg-brand border-brand' : 'border-[#444] bg-dark-2'
              }`}
            >
              {agreed && (
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[#888] text-sm leading-relaxed">
              I agree to the{' '}
              <span className="text-brand">Terms of Service</span> &amp;{' '}
              <span className="text-brand">Privacy Policy</span>
            </span>
          </label>
        </div>
      </div>

      <div className="flex-1" />

      <div className="px-6 pb-safe pb-8 flex flex-col gap-3">
        <button
          onClick={() => setStep('otp')}
          className="w-full bg-brand text-white font-semibold text-base py-4 rounded-2xl active:scale-[0.98] transition-transform"
        >
          Continue
        </button>
        <p className="text-center text-sm text-[#666]">
          Already have an account?{' '}
          <button onClick={() => go('job-feed')} className="text-brand font-medium">Log in</button>
        </p>
      </div>
    </div>
  )
}
