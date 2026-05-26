'use client'
import { useState } from 'react'
import JobCard from '../ui/JobCard'
import BottomTabBar from '../ui/BottomTabBar'
import { mockJobs, mockMessages } from '@/lib/mock-data'
import type { Screen, Job } from '@/lib/types'

type TabId = 'swipe' | 'saved' | 'messages' | 'profile'

/* ── Job Detail Bottom Sheet ─────────────────────────── */
function JobDetailSheet({ job, isSaved, onClose, onSave, onApply }: {
  job: Job; isSaved: boolean
  onClose: () => void; onSave: () => void; onApply: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 animate-fade-in" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] animate-slide-up overflow-hidden flex flex-col"
        style={{ maxHeight: '88%' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-[#e0e0e0] rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 border-b border-[#f0f0f0] flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center flex-shrink-0"
                style={{ background: job.companyColor }}
              >
                <span className="text-[13px] font-bold text-[#3a3a3a]">{job.companyInitials}</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-black text-[15px] tracking-[-0.45px] font-normal">{job.company}</span>
                  {job.verified && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="7" fill="#0f65ef" />
                      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[#969696] text-[12px] tracking-[-0.36px]">{job.location} · {job.jobType}</span>
              </div>
            </div>
            <div className="bg-[#f0f6ff] border border-[#cddffb] px-3 py-1 rounded-full flex-shrink-0">
              <span className="text-brand text-[13px] tracking-[-0.39px] font-bold">{job.matchPercent}% match</span>
            </div>
          </div>

          <h2 className="font-black text-[28px] tracking-[-0.84px] text-black mt-3 leading-[1.05]">{job.title}</h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-black text-[15px] tracking-[-0.45px] font-normal">{job.salary}</span>
            <div className="w-1 h-1 rounded-full bg-[#c0c0c0]" />
            <span className="text-[#606060] text-[13px]">{job.experience} exp</span>
          </div>

          <div className="flex flex-wrap gap-[6px] mt-3">
            {job.tags.map(tag => (
              <span key={tag} className="bg-[#e8f0fc] text-[#3a6cc0] text-[11px] tracking-[-0.33px] px-3 py-[5px] rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 flex flex-col gap-5">
          {/* About the role */}
          <div>
            <h3 className="font-bold text-black text-[15px] tracking-[-0.45px] mb-2">About this role</h3>
            <p className="text-[#606060] text-[14px] tracking-[-0.42px] leading-[1.55]">{job.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-bold text-black text-[15px] tracking-[-0.45px] mb-2">Requirements</h3>
            <div className="flex flex-col gap-[10px]">
              {job.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[18px] h-[18px] rounded-full bg-[#e8f0fc] flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#0f65ef" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#606060] text-[14px] tracking-[-0.42px] leading-[1.45]">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About company */}
          <div className="bg-[#f8f8f8] rounded-[16px] p-4">
            <h3 className="font-bold text-black text-[15px] tracking-[-0.45px] mb-2">About {job.company}</h3>
            <p className="text-[#606060] text-[13px] tracking-[-0.39px] leading-[1.5]">{job.aboutCompany}</p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 pb-2">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#b0b0b0" strokeWidth="1.8" />
                <path d="M12 6v6l4 2" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-[#b0b0b0] text-[12px] tracking-[-0.36px]">Posted {job.postedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="9" cy="7" r="4" stroke="#b0b0b0" strokeWidth="1.8" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-[#b0b0b0] text-[12px] tracking-[-0.36px]">{job.applicants} applicants</span>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="px-5 pb-8 pt-3 border-t border-[#f0f0f0] flex gap-3 flex-shrink-0 bg-white">
          <button
            onClick={() => { onSave(); }}
            className={`w-[52px] h-[52px] rounded-full border flex items-center justify-center flex-shrink-0 ${
              isSaved ? 'border-brand bg-[#f0f6ff]' : 'border-[#e0e0e0] bg-white'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                stroke={isSaved ? '#0f65ef' : '#606060'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isSaved ? '#0f65ef' : 'none'}
              />
            </svg>
          </button>
          <button
            onClick={onApply}
            className="flex-1 bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[14px] rounded-[999px]"
          >
            Apply now
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Swipe Tab ────────────────────────────────────────── */
function SwipeTab({
  jobs, currentIndex, savedIds,
  onSwipeLeft, onSwipeRight, onSave, onTap,
  appliedTitle,
}: {
  jobs: typeof mockJobs; currentIndex: number; savedIds: Set<string>
  onSwipeLeft: () => void; onSwipeRight: (job: Job) => void
  onSave: (id: string) => void; onTap: (job: Job) => void
  appliedTitle: string | null
}) {
  const visible = jobs.slice(currentIndex, currentIndex + 3)
  const remaining = jobs.length - currentIndex

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
      {/* Stack label + counter */}
      <div className="flex items-center justify-between px-5 pt-1 pb-2 flex-shrink-0">
        <span className="text-[#969696] text-[12px] tracking-[-0.36px]">
          {remaining > 0 ? `${remaining} job${remaining !== 1 ? 's' : ''} in your feed` : 'No more jobs'}
        </span>
        {/* Stack dots */}
        <div className="flex items-center gap-[5px]">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{
                width: i === 0 ? 16 : 6,
                height: 6,
                background: i === 0 ? '#0f65ef' : '#e0e0e0',
              }}
            />
          ))}
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 relative flex items-center justify-center" style={{ minHeight: 0 }}>
        {visible.length === 0 ? (
          <div className="flex flex-col items-center text-center px-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#f6f6f6] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#c0c0c0" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M22 4L12 14.01l-3-3" stroke="#c0c0c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-bold text-[22px] text-black tracking-[-0.66px]">All caught up!</p>
            <p className="text-[#969696] text-[14px] tracking-[-0.42px] leading-relaxed">
              You&apos;ve reviewed all available jobs. Check back later for new matches.
            </p>
          </div>
        ) : (
          visible.slice().reverse().map((job, revIdx) => {
            const stackIdx = visible.length - 1 - revIdx
            return (
              <JobCard
                key={job.id}
                job={job}
                isTop={stackIdx === 0}
                stackIndex={stackIdx}
                isSaved={savedIds.has(job.id)}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={() => onSwipeRight(job)}
                onSave={() => onSave(job.id)}
                onTap={() => onTap(job)}
              />
            )
          })
        )}

        {/* Applied toast */}
        {appliedTitle && (
          <div
            className="absolute bottom-4 left-1/2 animate-toast flex items-center gap-3 bg-white border border-[#e8e8e8] rounded-full px-4 py-[10px] shadow-lg"
            style={{ transform: 'translateX(-50%)', zIndex: 20, minWidth: 200 }}
          >
            <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5 9-10" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-black text-[13px] tracking-[-0.39px] leading-none">Applied!</p>
              <p className="text-[#969696] text-[11px] tracking-[-0.33px] mt-[2px] truncate max-w-[150px]">{appliedTitle}</p>
            </div>
          </div>
        )}
      </div>

      {/* Swipe hint */}
      {visible.length > 0 && (
        <div className="flex-shrink-0 flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-[5px] text-[#d0d0d0]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] tracking-[-0.33px]">Pass</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <span className="text-[#d0d0d0] text-[11px] tracking-[-0.33px]">Tap to view details</span>
          <div className="w-1 h-1 rounded-full bg-[#e8e8e8]" />
          <div className="flex items-center gap-[5px] text-[#d0d0d0]">
            <span className="text-[11px] tracking-[-0.33px]">Apply</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M14 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Saved Tab ────────────────────────────────────────── */
function SavedTab({ savedIds, jobs }: { savedIds: Set<string>; jobs: typeof mockJobs }) {
  const saved = jobs.filter(j => savedIds.has(j.id))

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[20px] tracking-[-0.6px] text-black">Saved jobs</h2>
        <span className="text-[#969696] text-[13px] tracking-[-0.39px]">{saved.length} saved</span>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center text-center pt-16 gap-4">
          <div className="w-16 h-16 rounded-full bg-[#f6f6f6] flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="#c0c0c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-bold text-[18px] text-black tracking-[-0.54px]">No saved jobs yet</p>
          <p className="text-[#969696] text-[14px] tracking-[-0.42px] leading-relaxed w-[220px]">
            Tap the bookmark on any job card to save it here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {saved.map(job => (
            <div key={job.id} className="bg-[#f8f8f8] border border-[#efefef] rounded-[20px] p-4 flex gap-3 items-start">
              <div
                className="w-[42px] h-[42px] rounded-[12px] flex items-center justify-center flex-shrink-0"
                style={{ background: job.companyColor }}
              >
                <span className="text-[11px] font-bold text-[#3a3a3a]">{job.companyInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-[15px] tracking-[-0.45px] text-black leading-none">{job.title}</p>
                    <p className="text-[#969696] text-[12px] tracking-[-0.36px] mt-[3px]">{job.company} · {job.location}</p>
                  </div>
                  <span className="text-brand text-[12px] tracking-[-0.36px] font-bold flex-shrink-0">{job.matchPercent}%</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-black text-[13px] tracking-[-0.39px]">{job.salary}</span>
                  <div className="w-1 h-1 rounded-full bg-[#d0d0d0]" />
                  <span className="text-[#969696] text-[12px]">{job.jobType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Messages Tab ─────────────────────────────────────── */
function MessagesTab() {
  const totalUnread = mockMessages.reduce((s, m) => s + m.unread, 0)

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-[20px] tracking-[-0.6px] text-black">Messages</h2>
        {totalUnread > 0 && (
          <span className="bg-brand text-white text-[11px] font-bold px-2 py-[3px] rounded-full">
            {totalUnread} new
          </span>
        )}
      </div>

      <div className="flex flex-col gap-[2px]">
        {mockMessages.map(msg => (
          <button
            key={msg.id}
            className="flex items-center gap-3 py-[14px] px-1 w-full text-left border-b border-[#f4f4f4] last:border-0"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-[46px] h-[46px] rounded-full flex items-center justify-center"
                style={{ background: msg.companyColor }}
              >
                <span className="text-[13px] font-bold text-[#3a3a3a]">{msg.companyInitials}</span>
              </div>
              {msg.isOnline && (
                <div className="absolute bottom-0 right-0 w-[12px] h-[12px] rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[14px] tracking-[-0.42px] truncate ${msg.unread > 0 ? 'font-bold text-black' : 'font-normal text-black'}`}>
                  {msg.company}
                </span>
                <span className="text-[#b0b0b0] text-[11px] tracking-[-0.33px] flex-shrink-0">{msg.time}</span>
              </div>
              <p className="text-[#969696] text-[12px] tracking-[-0.36px] mt-[2px]">{msg.role}</p>
              <div className="flex items-center justify-between gap-2 mt-[2px]">
                <p className={`text-[12px] tracking-[-0.36px] truncate leading-none ${msg.unread > 0 ? 'text-black' : 'text-[#b0b0b0]'}`}>
                  {msg.lastMessage}
                </p>
                {msg.unread > 0 && (
                  <span className="bg-brand text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0">
                    {msg.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Profile Tab ──────────────────────────────────────── */
function ProfileTab() {
  const stats = [
    { value: '12', label: 'Applied' },
    { value: '8',  label: 'Saved' },
    { value: '45', label: 'Profile views' },
  ]

  const settings = [
    { icon: '👤', label: 'Edit profile' },
    { icon: '📄', label: 'My resume' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '🔒', label: 'Privacy settings' },
    { icon: '⭐', label: 'Rate SwypeJobs' },
    { icon: '💬', label: 'Help & support' },
    { icon: '🚪', label: 'Logout', danger: true },
  ]

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-4 pb-5 border-b border-[#f4f4f4]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-[64px] h-[64px] rounded-full bg-brand flex items-center justify-center">
              <span className="text-white text-[20px] font-bold tracking-[-0.6px]">AO</span>
            </div>
            <div className="absolute bottom-0 right-0 w-[20px] h-[20px] rounded-full bg-white border border-[#e8e8e8] flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div>
            <p className="font-bold text-[18px] tracking-[-0.54px] text-black">Adebayo Okafor</p>
            <p className="text-[#969696] text-[13px] tracking-[-0.39px] mt-[2px]">Product Designer</p>
            <div className="flex items-center gap-1 mt-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#969696" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" stroke="#969696" strokeWidth="2" />
              </svg>
              <span className="text-[#969696] text-[12px] tracking-[-0.36px]">Lagos, Nigeria</span>
            </div>
          </div>
          <div className="ml-auto">
            <div className="bg-green-50 border border-green-200 px-2 py-[5px] rounded-full">
              <span className="text-green-700 text-[11px] tracking-[-0.33px] font-normal">Open to work</span>
            </div>
          </div>
        </div>

        {/* Bio chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['Figma', 'UX Research', 'Prototyping', 'Design Systems'].map(skill => (
            <span key={skill} className="bg-[#e8f0fc] text-[#3a6cc0] text-[11px] tracking-[-0.33px] px-3 py-[5px] rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 my-4 bg-[#f8f8f8] rounded-[18px] p-4 flex items-center justify-around">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-[3px]">
            <span className="font-black text-[24px] tracking-[-0.72px] text-black">{value}</span>
            <span className="text-[#969696] text-[11px] tracking-[-0.33px]">{label}</span>
          </div>
        ))}
      </div>

      {/* Settings list */}
      <div className="px-5 pb-8">
        <p className="text-[#b0b0b0] text-[11px] tracking-[-0.33px] uppercase mb-3">Account</p>
        <div className="bg-[#f8f8f8] rounded-[18px] overflow-hidden">
          {settings.map(({ icon, label, danger }, i) => (
            <button
              key={label}
              className={`w-full flex items-center justify-between px-4 py-[14px] text-left ${
                i < settings.length - 1 ? 'border-b border-[#f0f0f0]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[16px]">{icon}</span>
                <span className={`text-[14px] tracking-[-0.42px] ${danger ? 'text-red-500' : 'text-black'}`}>
                  {label}
                </span>
              </div>
              {!danger && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="#c0c0c0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const CATEGORIES = ['All', 'Remote', 'Design', 'Tech', 'Finance', 'Marketing']

/* ── Main JobFeedScreen ───────────────────────────────── */
export default function JobFeedScreen({ go: _go }: { go: (s: Screen) => void }) {
  const [jobs]                        = useState(mockJobs)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab]     = useState<TabId>('swipe')
  const [savedIds, setSavedIds]       = useState<Set<string>>(new Set())
  const [appliedTitle, setApplied]    = useState<string | null>(null)
  const [detailJob, setDetailJob]     = useState<Job | null>(null)
  const [category, setCategory]       = useState('All')

  const handleSwipeRight = (job: Job) => {
    setCurrentIndex(p => p + 1)
    setApplied(job.title)
    setTimeout(() => setApplied(null), 2400)
  }
  const handleSwipeLeft = () => setCurrentIndex(p => p + 1)
  const handleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const tabTitle: Record<TabId, string> = {
    swipe: 'Find Jobs',
    saved: 'Saved',
    messages: 'Messages',
    profile: 'Profile',
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top bar */}
      <div className="pt-[52px] flex-shrink-0">
        {activeTab === 'swipe' ? (
          <div className="px-5">
            {/* Top row: greeting + icons */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[20px] tracking-[-0.6px] text-black leading-none">
                  Good morning, Ade 👋
                </p>
                <div className="flex items-center gap-[5px] mt-[4px]">
                  <div className="w-[6px] h-[6px] rounded-full bg-green-500" />
                  <p className="text-[#b0b0b0] text-[12px] tracking-[-0.36px]">
                    {Math.max(0, jobs.length - currentIndex)} new matches today
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <button className="w-[38px] h-[38px] bg-[#f6f6f6] border border-[#ebebeb] rounded-full flex items-center justify-center relative">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-brand rounded-full border-[1.5px] border-white" />
                </button>
                <div className="w-[38px] h-[38px] rounded-full bg-brand flex items-center justify-center" style={{ boxShadow: '0 2px 8px rgba(15,101,239,0.3)' }}>
                  <span className="text-white text-[12px] font-bold">AO</span>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex gap-2 mt-3">
              <div className="flex-1 bg-[#f7f7f7] border border-[#ebebeb] rounded-full flex items-center gap-[8px] px-4 py-[10px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#c0c0c0" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" stroke="#c0c0c0" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-[#c8c8c8] text-[13px] tracking-[-0.39px]">Search jobs or companies…</span>
              </div>
              <button className="w-[42px] h-[42px] bg-[#f7f7f7] border border-[#ebebeb] rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="4" y1="6" x2="20" y2="6" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4" y1="12" x2="15" y2="12" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4" y1="18" x2="11" y2="18" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Category chips */}
            <div className="flex gap-[7px] mt-3 overflow-x-auto no-scrollbar pb-[2px] -mx-5 px-5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-shrink-0 px-[14px] py-[6px] rounded-full text-[12px] tracking-[-0.36px] font-normal transition-colors ${
                    category === cat
                      ? 'bg-brand text-white'
                      : 'bg-[#f7f7f7] border border-[#ebebeb] text-[#606060]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-5 flex items-center justify-between pb-3">
            <h1 className="font-bold text-[22px] tracking-[-0.66px] text-black">{tabTitle[activeTab]}</h1>
            {activeTab === 'messages' && (
              <button className="bg-[#f6f6f6] border border-[#e8e8e8] rounded-full px-3 py-2">
                <span className="text-[12px] tracking-[-0.36px] text-[#606060]">Edit</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab content */}
      {activeTab === 'swipe' && (
        <SwipeTab
          jobs={jobs}
          currentIndex={currentIndex}
          savedIds={savedIds}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onSave={handleSave}
          onTap={setDetailJob}
          appliedTitle={appliedTitle}
        />
      )}
      {activeTab === 'saved' && <SavedTab savedIds={savedIds} jobs={jobs} />}
      {activeTab === 'messages' && <MessagesTab />}
      {activeTab === 'profile' && <ProfileTab />}

      {/* Bottom tab bar */}
      <BottomTabBar active={activeTab} onTab={setActiveTab} savedCount={savedIds.size} />

      {/* Job detail overlay */}
      {detailJob && (
        <JobDetailSheet
          job={detailJob}
          isSaved={savedIds.has(detailJob.id)}
          onClose={() => setDetailJob(null)}
          onSave={() => handleSave(detailJob.id)}
          onApply={() => {
            setCurrentIndex(p => p + 1)
            setApplied(detailJob.title)
            setDetailJob(null)
            setActiveTab('swipe')
            setTimeout(() => setApplied(null), 2400)
          }}
        />
      )}
    </div>
  )
}
