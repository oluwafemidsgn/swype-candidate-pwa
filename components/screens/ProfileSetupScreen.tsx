'use client'
import { useState } from 'react'
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Screen } from '@/lib/types'

const EXPERIENCE_OPTIONS = ['0', '1', '2-3', '4-6', '7+']
const QUALIFICATIONS = ['SSCE', 'OND', 'HND', 'BSc', 'MSc', 'PhD']
const CITIES = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Other']
const SKILLS = [
  'Excel', 'Customer Service', 'Sales', 'AutoCAD', 'Python', 'Data Analysis',
  'Project Management', 'Communication', 'Marketing', 'Finance', 'SQL', 'Leadership',
  'Adobe Suite', 'Social Media', 'Accounting', 'Engineering',
]

export default function ProfileSetupScreen({ go }: { go: (s: Screen) => void }) {
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState('2-3')
  const [qualification, setQualification] = useState('BSc')
  const [city, setCity] = useState('Lagos')
  const [openToRelocate, setOpenToRelocate] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Sales', 'Customer Service'])

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Header */}
      <div className="px-6 pt-safe flex-shrink-0">
        <div className="pt-4 flex items-center justify-between">
          <button onClick={() => go('signup')} className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2">
            <ChevronLeft size={20} className="text-white" />
          </button>
          {/* Progress dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-6 bg-brand' : 'w-1.5 bg-[#333]'}`}
              />
            ))}
          </div>
          <button onClick={() => go('video-record')} className="text-[#666] text-sm">Skip</button>
        </div>

        <h1 className="text-[28px] font-bold tracking-[-1.2px] mt-6 text-white">Tell us about<br />yourself</h1>
        <p className="text-[#888] text-sm mt-2">Help employers find the right fit for you.</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-6">
        {/* Profile photo */}
        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#444] flex flex-col items-center justify-center cursor-pointer hover:border-brand transition-colors bg-dark-2">
            <Camera size={24} className="text-[#555]" />
          </div>
          <p className="text-[#666] text-xs mt-2">Add photo</p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Job title */}
          <div>
            <label className="text-[#aaa] text-sm mb-2 block">What do you do?</label>
            <input
              type="text"
              placeholder="e.g. Sales Representative"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="w-full bg-dark-2 border border-[#333] rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#555] focus:border-brand outline-none transition-colors"
            />
          </div>

          {/* Experience stepper */}
          <div>
            <label className="text-[#aaa] text-sm mb-3 block">Years of experience</label>
            <div className="flex gap-2">
              {EXPERIENCE_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setExperience(opt)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                    experience === opt
                      ? 'bg-brand text-white'
                      : 'bg-dark-2 text-[#888] border border-[#333]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="text-[#aaa] text-sm mb-3 block">Highest qualification</label>
            <div className="flex flex-wrap gap-2">
              {QUALIFICATIONS.map(q => (
                <button
                  key={q}
                  onClick={() => setQualification(q)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    qualification === q
                      ? 'bg-brand text-white'
                      : 'bg-dark-2 text-[#888] border border-[#333]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="text-[#aaa] text-sm mb-3 block">Current city</label>
            <div className="flex flex-wrap gap-2">
              {CITIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    city === c
                      ? 'bg-brand text-white'
                      : 'bg-dark-2 text-[#888] border border-[#333]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Relocate toggle */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-white text-sm font-medium">Open to relocate?</p>
              <p className="text-[#666] text-xs mt-0.5">We&apos;ll show you jobs across Nigeria</p>
            </div>
            <button
              onClick={() => setOpenToRelocate(!openToRelocate)}
              className={`w-12 h-6 rounded-full transition-colors relative ${openToRelocate ? 'bg-brand' : 'bg-[#333]'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${openToRelocate ? 'left-6' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Skills */}
          <div>
            <label className="text-[#aaa] text-sm mb-3 block">Select your top skills</label>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-brand text-white'
                      : 'bg-dark-2 text-[#888] border border-[#333]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-safe pb-8 flex-shrink-0 border-t border-[#1a1a1a] pt-4">
        <button
          onClick={() => go('video-record')}
          className="w-full bg-brand text-white font-semibold text-base py-4 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
