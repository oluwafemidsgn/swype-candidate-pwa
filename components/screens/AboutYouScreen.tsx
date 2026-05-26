'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

function Field({ label, placeholder, value, onChange, type = 'text' }: {
  label: string; placeholder: string; value: string
  onChange: (v: string) => void; type?: string
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 text-[12px] tracking-[-0.36px] text-black placeholder-[#969696] outline-none font-normal focus:border-brand transition-colors"
      />
    </div>
  )
}

export default function AboutYouScreen({ go }: { go: (s: Screen) => void }) {
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [location, setLocation] = useState('')
  const [relocation, setRelocation] = useState('')
  const [skills, setSkills] = useState('')

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Header */}
        <div className="mt-[99px] flex flex-col gap-[15px] w-[286px]">
          <div className="bg-[#d0e1fd] self-start px-4 py-1 rounded-full">
            <span className="text-[#606060] text-[12px] tracking-[-0.36px] font-normal">Step 1 of 3</span>
          </div>
          <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-none">About you</h1>
          <p className="text-[#606060] text-[17px] tracking-[-0.51px] leading-[1.4]">
            Tell us a little bit about you and your career.
          </p>
        </div>

        {/* Fields */}
        <div className="mt-[32px] flex flex-col gap-[10px] pb-6">
          <Field label="Job title"        placeholder="e.g. Product Designer"       value={jobTitle}        onChange={setJobTitle} />
          <Field label="Experience"       placeholder="e.g. 3 years"                value={experience}      onChange={setExperience} />
          <Field label="Qualifications"   placeholder="e.g. BSc Computer Science"   value={qualifications}  onChange={setQualifications} />
          <Field label="Location"         placeholder="e.g. Lagos"                  value={location}        onChange={setLocation} />
          <Field label="Open to relocation" placeholder="Yes / No / Open to discuss" value={relocation}    onChange={setRelocation} />
          <Field label="Skills"           placeholder="e.g. Engineering, Design"    value={skills}          onChange={setSkills} />
        </div>
      </div>

      {/* Continue */}
      <div className="px-6 pb-10 bg-white">
        <button
          onClick={() => go('video-record')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] active:opacity-80 transition-opacity"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
