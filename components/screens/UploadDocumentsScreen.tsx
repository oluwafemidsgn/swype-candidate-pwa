'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

export default function UploadDocumentsScreen({ go }: { go: (s: Screen) => void }) {
  const [cvFile, setCvFile] = useState<string | null>(null)
  const [certFile, setCertFile] = useState<string | null>(null)
  const [portfolio, setPortfolio] = useState('')

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Header */}
        <div className="mt-[99px] flex flex-col gap-[15px]">
          <div className="bg-[#d0e1fd] self-start px-4 py-1 rounded-full">
            <span className="text-[#606060] text-[12px] tracking-[-0.36px] font-normal">Step 3 of 3</span>
          </div>
          <h1 className="font-bold text-[40px] tracking-[-1.2px] text-black leading-none">Upload documents</h1>
          <p className="text-[#606060] text-[17px] tracking-[-0.51px] leading-[1.4]">
            Upload your cv and any certificates here.
          </p>
        </div>

        {/* CV upload */}
        <div className="mt-[32px] flex flex-col gap-[10px]">
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">CV</p>
          <label className="bg-[#f6f6f6] border border-[#ddd] rounded-[24px] h-[92px] flex items-center justify-center cursor-pointer active:opacity-70 transition-opacity">
            <span className="text-[#969696] text-[12px] tracking-[-0.36px] font-normal">
              {cvFile ?? 'Click to upload'}
            </span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setCvFile(e.target.files?.[0]?.name ?? null)} />
          </label>
        </div>

        {/* Certificates */}
        <div className="mt-[16px] flex flex-col gap-[10px]">
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">Professionals certificates</p>
          <label className="bg-[#f6f6f6] border border-[#ddd] rounded-[24px] h-[92px] flex items-center justify-center cursor-pointer active:opacity-70 transition-opacity">
            <span className="text-[#969696] text-[12px] tracking-[-0.36px] font-normal">
              {certFile ?? 'Click to upload'}
            </span>
            <input type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={e => setCertFile(e.target.files?.[0]?.name ?? null)} />
          </label>
        </div>

        {/* Portfolio */}
        <div className="mt-[16px] flex flex-col gap-[10px] pb-6">
          <p className="text-[#606060] text-[16px] tracking-[-0.48px] leading-[1.4]">Portfolio/ website link</p>
          <input
            type="url"
            placeholder="www."
            value={portfolio}
            onChange={e => setPortfolio(e.target.value)}
            className="w-full bg-[#f6f6f6] border border-[#ddd] rounded-full px-3 py-3 text-[12px] tracking-[-0.36px] text-black placeholder-[#969696] outline-none font-normal focus:border-brand transition-colors"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 bg-white">
        <button
          onClick={() => go('job-feed')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[10px] rounded-[999px] active:opacity-80 transition-opacity"
        >
          All good
        </button>
      </div>
    </div>
  )
}
