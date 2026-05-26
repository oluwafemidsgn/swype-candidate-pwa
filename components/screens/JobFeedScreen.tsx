'use client'
import { useState } from 'react'
import { SlidersHorizontal, Bell, X, Star, Heart, Flame } from 'lucide-react'
import SwipeCard from '../ui/SwipeCard'
import BottomTabBar from '../ui/BottomTabBar'
import { mockJobs } from '@/lib/mock-data'
import type { Screen } from '@/lib/types'

const FILTERS = ['All', 'Full-time', 'Remote', 'Lagos', 'Entry Level']

export default function JobFeedScreen({ go }: { go: (s: Screen) => void }) {
  const [jobs, setJobs] = useState(mockJobs)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')
  const [swipedRight, setSwipedRight] = useState(0)

  const visibleJobs = jobs.slice(currentIndex, currentIndex + 3)

  const handleSwipeLeft = () => {
    setCurrentIndex(prev => prev + 1)
  }

  const handleSwipeRight = () => {
    setSwipedRight(prev => prev + 1)
    setCurrentIndex(prev => prev + 1)
    if (swipedRight + 1 >= 1) {
      setTimeout(() => go('match'), 300)
    }
  }

  const handlePass = () => {
    setCurrentIndex(prev => prev + 1)
  }

  const handleInterested = () => {
    handleSwipeRight()
  }

  const isEmpty = currentIndex >= jobs.length

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Top bar */}
      <div className="flex-shrink-0 pt-safe">
        <div className="flex items-center justify-between px-5 py-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2 border border-[#2a2a2a]">
            <SlidersHorizontal size={18} className="text-[#888]" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 44 44" fill="none">
                <path d="M22 6C22 6 10 16 10 25C10 31.627 15.373 37 22 37C28.627 37 34 31.627 34 25C34 16 22 6 22 6Z" fill="white" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-[-0.5px]">Swype</span>
          </div>

          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2 border border-[#2a2a2a] relative">
            <Bell size={18} className="text-[#888]" />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-brand rounded-full" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-brand text-white'
                  : 'bg-dark-3 text-[#888] border border-[#333]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {isEmpty ? (
          <div className="flex flex-col items-center gap-4 px-10 text-center">
            <div className="w-16 h-16 rounded-full bg-dark-2 flex items-center justify-center">
              <Flame size={28} className="text-[#444]" />
            </div>
            <h3 className="text-white font-semibold text-lg">You&apos;re all caught up!</h3>
            <p className="text-[#666] text-sm leading-relaxed">Check back later for fresh opportunities, or upgrade to Swype+ for unlimited swipes.</p>
            <button
              onClick={() => go('premium')}
              className="bg-brand text-white px-6 py-3 rounded-2xl text-sm font-semibold mt-2 active:scale-95 transition-transform"
            >
              Upgrade to Swype+
            </button>
          </div>
        ) : (
          visibleJobs
            .slice()
            .reverse()
            .map((job, revIdx) => {
              const stackIndex = visibleJobs.length - 1 - revIdx
              return (
                <SwipeCard
                  key={job.id}
                  job={job}
                  isTop={stackIndex === 0}
                  stackIndex={stackIndex}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onClick={() => go('job-detail')}
                />
              )
            })
        )}
      </div>

      {/* Action buttons */}
      {!isEmpty && (
        <div className="flex-shrink-0 flex items-center justify-center gap-5 py-4">
          <button
            onClick={handlePass}
            className="w-[52px] h-[52px] rounded-full bg-dark-2 border border-[#333] flex items-center justify-center active:scale-90 transition-transform shadow-lg"
          >
            <X size={22} className="text-red-400" />
          </button>
          <button
            onClick={() => {}}
            className="w-[52px] h-[52px] rounded-full bg-dark-2 border border-yellow-500/40 flex items-center justify-center active:scale-90 transition-transform shadow-lg"
          >
            <Star size={22} className="text-yellow-400 fill-yellow-400" />
          </button>
          <button
            onClick={handleInterested}
            className="w-[52px] h-[52px] rounded-full bg-dark-2 border border-green-500/40 flex items-center justify-center active:scale-90 transition-transform shadow-lg"
          >
            <Heart size={22} className="text-green-400 fill-green-400" />
          </button>
        </div>
      )}

      <BottomTabBar screen="job-feed" go={go} />
    </div>
  )
}
