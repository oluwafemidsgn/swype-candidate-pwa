'use client'
import { useState } from 'react'
import JobCard from '../ui/JobCard'
import BottomTabBar from '../ui/BottomTabBar'
import { mockJobs } from '@/lib/mock-data'
import type { Screen } from '@/lib/types'

type TabId = 'swipe' | 'saved' | 'messages' | 'profile'

export default function JobFeedScreen({ go: _go }: { go: (s: Screen) => void }) {
  const [jobs, setJobs] = useState(mockJobs)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabId>('swipe')

  const visibleJobs = jobs.slice(currentIndex, currentIndex + 3)

  const next = () => setCurrentIndex(p => p + 1)

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top bar */}
      <div className="px-6 pt-[56px] pb-0 flex flex-col gap-6">
        {/* Search + icons */}
        <div className="flex gap-2 items-center h-[56px]">
          <div className="flex-1 bg-[#f6f6f6] border border-[#ddd] rounded-full flex items-center gap-[10px] px-3 py-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#969696" strokeWidth="1.8" />
              <path d="M21 21l-4.35-4.35" stroke="#969696" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[#969696] text-[12px] tracking-[-0.36px] font-normal">Search</span>
          </div>
          <button className="w-[56px] h-[56px] bg-[#f6f6f6] border border-[#ddd] rounded-full flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="6" x2="20" y2="6" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="12" x2="16" y2="12" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="4" y1="18" x2="12" y2="18" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button className="w-[56px] h-[56px] bg-[#f6f6f6] border border-[#ddd] rounded-full flex items-center justify-center relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Greeting */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[20px] text-black tracking-[-0.6px] leading-none">Good morning Ade</p>
          <p className="text-[#606060] text-[14px] tracking-[-0.42px] leading-[1.4]">Lets get the application started.</p>
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {visibleJobs.length === 0 ? (
          <div className="text-center px-8">
            <p className="font-bold text-[22px] text-black tracking-[-0.6px]">You&apos;re all caught up!</p>
            <p className="text-[#606060] text-[15px] tracking-[-0.45px] mt-3 leading-relaxed">Check back later for new opportunities.</p>
          </div>
        ) : (
          visibleJobs.slice().reverse().map((job, revIdx) => {
            const stackIdx = visibleJobs.length - 1 - revIdx
            return (
              <JobCard
                key={job.id}
                job={job}
                isTop={stackIdx === 0}
                stackIndex={stackIdx}
                onSwipeLeft={next}
                onSwipeRight={next}
              />
            )
          })
        )}
      </div>

      {/* Bottom tab */}
      <BottomTabBar active={activeTab} onTab={setActiveTab} />
    </div>
  )
}
