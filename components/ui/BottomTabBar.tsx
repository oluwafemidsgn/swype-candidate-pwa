'use client'

function SwipeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 11V6a2 2 0 014 0v5" stroke={active ? 'white' : '#888'} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 10a2 2 0 014 0v3" stroke={active ? 'white' : '#888'} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 11a2 2 0 00-4 0v4a7 7 0 007 7h1a5 5 0 005-5v-3" stroke={active ? 'white' : '#888'} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 13a2 2 0 012 2v1" stroke={active ? 'white' : '#888'} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
        stroke={active ? 'white' : '#888'}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? 'rgba(255,255,255,0.25)' : 'none'}
      />
    </svg>
  )
}

function MessageIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke={active ? 'white' : '#888'}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? 'rgba(255,255,255,0.25)' : 'none'}
      />
    </svg>
  )
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={active ? 'white' : '#888'} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" stroke={active ? 'white' : '#888'} strokeWidth="1.7" fill={active ? 'rgba(255,255,255,0.25)' : 'none'} />
    </svg>
  )
}

const TABS = [
  { id: 'swipe',    Icon: SwipeIcon,    label: 'Swipe'    },
  { id: 'saved',    Icon: BookmarkIcon, label: 'Saved'    },
  { id: 'messages', Icon: MessageIcon,  label: 'Messages' },
  { id: 'profile',  Icon: UserIcon,     label: 'Profile'  },
] as const

type TabId = typeof TABS[number]['id']

export default function BottomTabBar({
  active, onTab, savedCount = 0,
}: {
  active: TabId
  onTab: (t: TabId) => void
  savedCount?: number
}) {
  const totalUnread = 6

  return (
    <div className="flex-shrink-0 flex items-center justify-center py-3 bg-white border-t border-[#f4f4f4]">
      <div className="flex items-center gap-[2px] bg-[#f6f6f6] rounded-full px-2 py-2">
        {TABS.map(({ id, Icon, label }) => {
          const isActive = active === id
          const badge = id === 'saved' ? savedCount : id === 'messages' ? totalUnread : 0
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              aria-label={label}
              className={`relative flex flex-col items-center gap-[3px] px-4 py-[10px] rounded-full transition-colors ${
                isActive ? 'bg-brand' : 'bg-transparent'
              }`}
            >
              <Icon active={isActive} />
              <span className={`text-[9px] tracking-[-0.27px] font-normal leading-none ${isActive ? 'text-white' : 'text-[#aaa]'}`}>
                {label}
              </span>
              {badge > 0 && !isActive && (
                <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] rounded-full bg-brand border border-white" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
