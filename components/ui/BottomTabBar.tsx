'use client'
import type { Screen } from '@/lib/types'

/* Icon components matching Figma */
function SwipeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 11V6a2 2 0 0 1 4 0v5" stroke={active ? 'white' : '#606060'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 10a2 2 0 0 1 4 0v3" stroke={active ? 'white' : '#606060'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 11a2 2 0 0 0-4 0v4a7 7 0 0 0 7 7h1a5 5 0 0 0 5-5v-3" stroke={active ? 'white' : '#606060'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 13a2 2 0 0 1 2 2v1" stroke={active ? 'white' : '#606060'} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#606060" strokeWidth="1.5" />
    </svg>
  )
}
function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" stroke="#606060" strokeWidth="1.5" />
    </svg>
  )
}

const TABS = [
  { id: 'swipe',    Icon: SwipeIcon,   label: 'Swipe' },
  { id: 'saved',    Icon: HeartIcon,   label: 'Saved' },
  { id: 'messages', Icon: MessageIcon, label: 'Messages' },
  { id: 'profile',  Icon: UserIcon,    label: 'Profile' },
] as const

type TabId = typeof TABS[number]['id']

export default function BottomTabBar({ active, onTab }: { active: TabId; onTab: (t: TabId) => void }) {
  return (
    <div className="flex items-center justify-center py-3 bg-white">
      <div className="flex items-center gap-1 bg-[#f6f6f6] rounded-full px-2 py-2">
        {TABS.map(({ id, Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              aria-label={label}
              className={`p-4 rounded-full transition-colors ${isActive ? 'bg-brand' : 'bg-transparent'}`}
            >
              <Icon active={isActive} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
