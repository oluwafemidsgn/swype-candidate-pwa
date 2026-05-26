'use client'
import { useState } from 'react'
import { ChevronLeft, Check, Zap, Eye, TrendingUp, Star, Infinity } from 'lucide-react'
import type { Screen } from '@/lib/types'

type Billing = 'monthly' | 'quarterly'

const FREE_FEATURES = ['20 swipes/day', 'Standard profile', 'Basic matching']
const PREMIUM_FEATURES = [
  { icon: Infinity, text: 'Unlimited swipes' },
  { icon: Eye, text: 'See who viewed your profile' },
  { icon: TrendingUp, text: 'Profile boost — appear first' },
  { icon: Zap, text: 'AI CV review & feedback' },
  { icon: Star, text: '5 Super Applies per day' },
]

export default function PremiumScreen({ go }: { go: (s: Screen) => void }) {
  const [billing, setBilling] = useState<Billing>('monthly')

  const price = billing === 'monthly' ? '₦2,500' : '₦6,500'
  const period = billing === 'monthly' ? '/month' : '/3 months'
  const saving = billing === 'quarterly' ? 'Save 13%' : null

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Header */}
      <div className="flex-shrink-0 pt-safe px-5">
        <div className="flex items-center justify-between py-4">
          <button onClick={() => go('job-feed')} className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-2">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <span className="text-[#555] text-xs bg-dark-2 px-3 py-1.5 rounded-full">Swype+</span>
          <div className="w-10" />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-4">
        {/* Hero */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-brand mx-auto flex items-center justify-center mb-4">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-[28px] font-bold tracking-[-1px] text-white">Level up your<br />job search</h1>
          <p className="text-[#888] text-sm mt-2">You&apos;ve used all your free swipes today.</p>
        </div>

        {/* Billing toggle */}
        <div className="flex bg-dark-2 rounded-2xl p-1 mb-5">
          {(['monthly', 'quarterly'] as Billing[]).map(b => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors relative ${
                billing === b ? 'bg-brand text-white' : 'text-[#666]'
              }`}
            >
              {b === 'monthly' ? 'Monthly' : '3 Months'}
              {b === 'quarterly' && (
                <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  SAVE 13%
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plan cards */}
        <div className="flex flex-col gap-3">
          {/* Free */}
          <div className="bg-dark-2 rounded-2xl p-4 border border-[#2a2a2a] opacity-60">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[#888] font-semibold">Free</p>
              <span className="text-[#555] text-xs border border-[#333] px-2.5 py-1 rounded-full">Current Plan</span>
            </div>
            <p className="text-[#444] font-bold text-2xl mb-3">₦0<span className="text-sm font-normal">/month</span></p>
            <div className="flex flex-col gap-2">
              {FREE_FEATURES.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={14} className="text-[#555]" />
                  <p className="text-[#555] text-sm">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="bg-dark-2 rounded-2xl p-4 border-2 border-brand relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-brand/5 pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-4 right-4 bg-brand text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              MOST POPULAR
            </div>

            <div className="mb-3">
              <p className="text-white font-bold text-lg">Swype+</p>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <p className="text-white font-bold text-[32px] tracking-[-1px]">{price}</p>
              <p className="text-[#888] text-sm">{period}</p>
              {saving && <span className="text-green-400 text-xs font-bold ml-1">{saving}</span>}
            </div>

            <div className="flex flex-col gap-2.5">
              {PREMIUM_FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-brand/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-brand" />
                  </div>
                  <p className="text-white text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-5 pb-safe pb-8 pt-4 border-t border-[#1f1f1f] flex flex-col gap-3">
        <button className="w-full bg-brand text-white font-bold text-base py-4 rounded-2xl active:scale-[0.98] transition-transform">
          Start 7-Day Free Trial
        </button>
        <button
          onClick={() => go('job-feed')}
          className="text-[#666] text-sm text-center py-2 active:opacity-70 transition-opacity"
        >
          Continue with Free →
        </button>
        <p className="text-[#555] text-[11px] text-center">
          Cancel anytime. Payment via Paystack.
        </p>
      </div>
    </div>
  )
}
