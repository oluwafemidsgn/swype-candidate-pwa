'use client'
import { useState } from 'react'
import { SlidersHorizontal, AlertTriangle } from 'lucide-react'
import BottomTabBar from '../ui/BottomTabBar'
import { mockMatches } from '@/lib/mock-data'
import type { Screen } from '@/lib/types'

type Tab = 'messages' | 'requests'

export default function MessagesScreen({ go }: { go: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('messages')

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Header */}
      <div className="flex-shrink-0 pt-safe px-5">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-[24px] font-bold tracking-[-0.8px]">Matches</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2">
            <SlidersHorizontal size={18} className="text-[#888]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#222]">
          {(['messages', 'requests'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-white border-b-2 border-brand'
                  : 'text-[#555]'
              }`}
            >
              {tab === 'messages' ? 'Messages' : 'Match Requests'}
              {tab === 'messages' && (
                <span className="ml-1.5 bg-brand text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {mockMatches.filter(m => m.unread > 0).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Safety banner */}
        <div className="mx-5 mt-4 mb-2 bg-[#1a1400] border border-yellow-600/30 rounded-2xl p-3 flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-500/90 text-xs leading-relaxed">
            Remember: Legitimate employers <span className="font-semibold">never</span> ask you to pay fees. Report if they do.
          </p>
        </div>

        {activeTab === 'messages' ? (
          <div className="flex flex-col">
            {mockMatches.map(match => (
              <button
                key={match.id}
                onClick={() => go('chat')}
                className="flex items-center gap-3 px-5 py-4 border-b border-[#181818] active:bg-dark-2 transition-colors"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-base"
                    style={{ backgroundColor: match.logoColor }}
                  >
                    {match.logoInitial}
                  </div>
                  {/* Online dot */}
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-dark" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-semibold text-sm">{match.company}</p>
                    <p className="text-[#555] text-xs flex-shrink-0">{match.timestamp}</p>
                  </div>
                  <p className="text-[#666] text-xs mt-0.5">{match.jobTitle}</p>
                  <p className="text-[#555] text-xs mt-1 truncate">{match.lastMessage}</p>
                </div>

                {/* Unread badge */}
                {match.unread > 0 && (
                  <div className="w-5 h-5 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">{match.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 px-8 text-center">
            <div className="w-14 h-14 rounded-full bg-dark-2 flex items-center justify-center mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-white font-semibold">No requests yet</p>
            <p className="text-[#666] text-sm mt-2">Employers who view your profile will show up here</p>
          </div>
        )}
      </div>

      <BottomTabBar screen="messages" go={go} />
    </div>
  )
}
