'use client'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import BottomTabBar from '../ui/BottomTabBar'
import { mockApplications, mockMatches } from '@/lib/mock-data'
import type { Screen } from '@/lib/types'

type Tab = 'matches' | 'applied' | 'saved'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  waiting: { label: 'Waiting for Response', color: '#888', bg: '#2a2a2a' },
  viewed: { label: 'Viewed by Employer', color: '#4da6ff', bg: '#0f2040' },
  matched: { label: 'Matched', color: '#4ade80', bg: '#0a2a15' },
  interview: { label: 'Interview Scheduled', color: '#c084fc', bg: '#1a0a2e' },
  'not-selected': { label: 'Not Selected', color: '#f87171', bg: '#2a0a0a' },
}

export default function ApplicationsScreen({ go }: { go: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('matches')

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Header */}
      <div className="flex-shrink-0 pt-safe px-5">
        <h1 className="text-[24px] font-bold tracking-[-0.8px] py-4">My Applications</h1>

        {/* Tabs */}
        <div className="flex border-b border-[#222]">
          {(['matches', 'applied', 'saved'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? 'text-white border-b-2 border-brand' : 'text-[#555]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'matches' && (
          <div className="flex flex-col">
            {mockMatches.map(match => (
              <button
                key={match.id}
                onClick={() => go('chat')}
                className="flex items-center gap-3 px-5 py-4 border-b border-[#181818] active:bg-dark-2 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: match.logoColor }}
                >
                  {match.logoInitial}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-semibold text-sm">{match.company}</p>
                    <CheckCircle2 size={13} className="text-brand fill-brand" />
                  </div>
                  <p className="text-[#666] text-xs">{match.jobTitle}</p>
                  <p className="text-[#555] text-xs mt-1 truncate">{match.lastMessage}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#555] text-xs">{match.timestamp}</p>
                  {match.unread > 0 && (
                    <div className="w-5 h-5 bg-brand rounded-full flex items-center justify-center mt-1 ml-auto">
                      <span className="text-white text-[10px] font-bold">{match.unread}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'applied' && (
          <div className="flex flex-col py-2">
            {mockApplications.map(app => {
              const status = STATUS_CONFIG[app.status]
              return (
                <div key={app.id} className="flex items-center gap-3 px-5 py-4 border-b border-[#181818]">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: app.logoColor }}
                  >
                    {app.logoInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{app.company}</p>
                    <p className="text-[#666] text-xs">{app.title}</p>
                    <p className="text-[#555] text-xs mt-0.5">Applied {app.date}</p>
                  </div>
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ color: status.color, backgroundColor: status.bg }}
                  >
                    {status.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="flex flex-col items-center justify-center h-64 px-8 text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-dark-2 flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-white font-semibold">No saved jobs yet</p>
            <p className="text-[#666] text-sm">Use Super Apply to bookmark your favorite jobs</p>
            <button
              onClick={() => go('job-feed')}
              className="border border-[#333] text-[#888] text-sm px-6 py-3 rounded-2xl mt-2 active:scale-95 transition-transform"
            >
              Find Jobs
            </button>
            {/* Upsell */}
            <div className="w-full bg-dark-2 border border-brand/30 rounded-2xl p-4 mt-2">
              <p className="text-brand text-xs font-semibold mb-1">Swype+ Feature</p>
              <p className="text-[#888] text-xs">Unlock unlimited saves with Swype+ — only ₦2,500/month</p>
              <button onClick={() => go('premium')} className="text-brand text-xs font-medium mt-2">Upgrade now →</button>
            </div>
          </div>
        )}
      </div>

      <BottomTabBar screen="applications" go={go} />
    </div>
  )
}
