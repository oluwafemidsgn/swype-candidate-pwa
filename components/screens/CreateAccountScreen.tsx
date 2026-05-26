'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

export default function CreateAccountScreen({ go }: { go: (s: Screen) => void }) {
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col h-full bg-white px-6">
      {/* Header */}
      <div className="mt-[89px]">
        <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-none w-[210px]">
          Create your account
        </h1>
        <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4] mt-4 w-[282px]">
          Hey, welcome to swype where you find the right job to match your swype.
        </p>
      </div>

      {/* Phone field */}
      <div className="mt-[40px] flex flex-col gap-[10px]">
        <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">
          Enter Phone number
        </p>
        <div className="flex gap-2 items-center">
          <div className="bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 flex items-center justify-center flex-shrink-0">
            <span className="text-[#969696] text-[12px] tracking-[-0.36px] font-normal">+234</span>
          </div>
          <input
            type="tel"
            placeholder="09161379900"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="flex-1 bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 text-[12px] tracking-[-0.36px] text-black placeholder-[#969696] outline-none font-normal"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* CTA */}
      <button
        onClick={() => go('otp-account')}
        className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] mb-10 active:opacity-80 transition-opacity"
      >
        Get otp code
      </button>
    </div>
  )
}
