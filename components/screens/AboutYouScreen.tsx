'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center">
          <div
            className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              i < current
                ? 'bg-brand text-white'
                : i === current
                ? 'bg-brand text-white ring-4 ring-brand/20'
                : 'bg-[#f0f0f0] text-[#b0b0b0]'
            }`}
          >
            {i < current ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < 2 && (
            <div className={`w-[24px] h-[2px] transition-all ${i < current ? 'bg-brand' : 'bg-[#e8e8e8]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

type FieldProps = {
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  icon: React.ReactNode
}

function Field({ label, placeholder, value, onChange, icon }: FieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[#606060] text-[14px] tracking-[-0.42px]">{label}</p>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#b0b0b0]">
          {icon}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full pl-10 pr-4 py-[14px] text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
        />
      </div>
    </div>
  )
}

export default function AboutYouScreen({ go }: { go: (s: Screen) => void }) {
  const [jobTitle, setJobTitle]         = useState('')
  const [experience, setExperience]     = useState('')
  const [qualifications, setQuals]      = useState('')
  const [location, setLocation]         = useState('')
  const [relocation, setRelocation]     = useState('')
  const [skills, setSkills]             = useState('')

  return (
    <div className="screen flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Back */}
        <button
          onClick={() => go('otp-account')}
          className="mt-[56px] -ml-1 p-1 flex items-center gap-1 text-[#606060] text-[14px] tracking-[-0.42px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4">
          <StepDots current={0} />
          <div>
            <h1 className="font-bold text-[36px] tracking-[-1.08px] text-black leading-none mt-2">About you</h1>
            <p className="text-[#606060] text-[15px] tracking-[-0.45px] leading-[1.5] mt-3 w-[280px]">
              Tell us about yourself so we can match you to the right roles.
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="mt-7 flex flex-col gap-[14px] pb-6">
          <Field
            label="Job title"
            placeholder="e.g. Product Designer"
            value={jobTitle}
            onChange={setJobTitle}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
          <Field
            label="Years of experience"
            placeholder="e.g. 3 years"
            value={experience}
            onChange={setExperience}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
          />
          <Field
            label="Highest qualification"
            placeholder="e.g. BSc Computer Science"
            value={qualifications}
            onChange={setQuals}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <Field
            label="Location"
            placeholder="e.g. Lagos, Nigeria"
            value={location}
            onChange={setLocation}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            }
          />
          <Field
            label="Open to relocation"
            placeholder="Yes / No / Open to discuss"
            value={relocation}
            onChange={setRelocation}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <Field
            label="Key skills"
            placeholder="e.g. Figma, React, Leadership"
            value={skills}
            onChange={setSkills}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 bg-white">
        <button
          onClick={() => go('video-record')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
