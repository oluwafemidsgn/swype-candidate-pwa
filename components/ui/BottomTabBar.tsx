'use client'
import { Flame, MessageCircle, Briefcase } from 'lucide-react'
import type { Screen } from '@/lib/types'

type Tab = { id: Screen; icon: typeof Flame; label: string; badge?: number }

const TABS: Tab[] = [
  { id: 'job-feed', icon: Flame, label: 'Discover' },
  { id: 'messages', icon: MessageCircle, label: 'Matches', badge: 1 },
  { id: 'applications', icon: Briefcase, label: 'Profile' },
]

export default function BottomTabBar({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  return (
    <div className="flex-shrink-0 bg-dark border-t border-[#1f1f1f] flex pb-safe">
      {TABS.map(tab => {
        const active = screen === tab.id
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => go(tab.id)}
            className="flex-1 flex flex-col items-center py-3 gap-1 relative active:opacity-70 transition-opacity"
          >
            <div className="relative">
              <Icon size={22} className={active ? 'text-brand' : 'text-[#555]'} />
              {tab.badge && !active && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-medium tracking-tight ${active ? 'text-brand' : 'text-[#555]'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
