'use client'
import { ChevronLeft, MapPin, Clock, Briefcase, CheckCircle2, X, Heart } from 'lucide-react'
import { mockJobs } from '@/lib/mock-data'
import type { Screen } from '@/lib/types'

export default function JobDetailScreen({ go }: { go: (s: Screen) => void }) {
  const job = mockJobs[0]

  return (
    <div className="flex flex-col h-full bg-dark text-white relative">
      {/* Bottom sheet that slides up */}
      <div
        className="absolute inset-x-0 bottom-0 bg-dark-2 animate-slide-up flex flex-col"
        style={{ height: '92%', borderRadius: '20px 20px 0 0' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-8 h-1 bg-[#444] rounded-full" />
        </div>

        {/* Close button */}
        <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
          <button
            onClick={() => go('job-feed')}
            className="w-9 h-9 rounded-full bg-dark-3 flex items-center justify-center"
          >
            <X size={18} className="text-[#888]" />
          </button>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-brand" />
            <span className="text-brand text-xs font-medium">CAC Verified</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
          {/* Company header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg"
              style={{ backgroundColor: job.logoColor }}
            >
              {job.logoInitial}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-white font-semibold">{job.company}</p>
                <CheckCircle2 size={14} className="text-brand fill-brand" />
              </div>
              <p className="text-[#666] text-xs">{job.type}</p>
            </div>
          </div>

          {/* Job title */}
          <h1 className="text-white font-bold text-[26px] tracking-[-0.8px] leading-tight">{job.title}</h1>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[job.type, 'On-site', job.location.split('·')[0].trim(), `Posted ${job.posted}`].map(m => (
              <span key={m} className="bg-dark-3 text-[#aaa] text-xs px-3 py-1.5 rounded-full">
                {m}
              </span>
            ))}
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2 mt-4 p-4 bg-dark-3 rounded-2xl">
            <Briefcase size={16} className="text-brand" />
            <div>
              <p className="text-[#888] text-xs">Monthly Salary</p>
              <p className="text-white font-semibold text-sm mt-0.5">{job.salary}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mt-3 p-4 bg-dark-3 rounded-2xl">
            <MapPin size={16} className="text-brand" />
            <div>
              <p className="text-[#888] text-xs">Location</p>
              <p className="text-white font-semibold text-sm mt-0.5">{job.location}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#2a2a2a] my-5" />

          {/* About the role */}
          <div className="mb-5">
            <h3 className="text-white font-semibold text-base mb-3">About the Role</h3>
            <p className="text-[#888] text-sm leading-relaxed">{job.description}</p>
          </div>

          <div className="h-px bg-[#2a2a2a] mb-5" />

          {/* Requirements */}
          <div className="mb-5">
            <h3 className="text-white font-semibold text-base mb-3">What You Need</h3>
            <div className="flex flex-col gap-2.5">
              {job.requirements.map(req => (
                <div key={req} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 flex-shrink-0" />
                  <p className="text-[#888] text-sm">{req}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#2a2a2a] mb-5" />

          {/* Nice to have */}
          <div className="mb-5">
            <h3 className="text-white font-semibold text-base mb-3">Nice to Have</h3>
            <div className="flex flex-col gap-2.5">
              {job.niceToHave.map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#555] mt-1.5 flex-shrink-0" />
                  <p className="text-[#888] text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#2a2a2a] mb-5" />

          {/* About company */}
          <div className="mb-6">
            <h3 className="text-white font-semibold text-base mb-3">About {job.company}</h3>
            <p className="text-[#888] text-sm leading-relaxed">{job.about}</p>
          </div>
        </div>

        {/* Bottom action buttons */}
        <div className="flex-shrink-0 flex gap-3 px-5 py-4 border-t border-[#222] pb-safe">
          <button
            onClick={() => go('job-feed')}
            className="flex-1 border border-[#333] text-[#888] font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <X size={18} /> Pass
          </button>
          <button
            onClick={() => go('match')}
            className="flex-1 bg-brand text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <Heart size={18} /> Interested
          </button>
        </div>
      </div>

      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-black/70 -z-10"
        onClick={() => go('job-feed')}
      />
    </div>
  )
}
