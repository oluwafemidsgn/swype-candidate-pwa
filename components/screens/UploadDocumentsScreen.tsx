'use client'
import { useState } from 'react'
import type { Screen } from '@/lib/types'

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center">
          <div
            className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              i < current
                ? 'bg-brand text-white'
                : i === current
                ? 'bg-brand text-white ring-4 ring-brand/20'
                : 'bg-[#f0f0f0] text-[#b0b0b0]'
            }`}
          >
            {i < current ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < 2 && (
            <div className={`w-[24px] h-[2px] transition-all ${i < current ? 'bg-brand' : 'bg-[#e8e8e8]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function UploadBox({
  label, hint, accept, file, onChange,
}: {
  label: string; hint: string; accept: string; file: string | null; onChange: (n: string | null) => void
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[#606060] text-[14px] tracking-[-0.42px]">{label}</p>
      <label className={`relative rounded-[20px] h-[100px] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
        file
          ? 'bg-[#f0f7ff] border-2 border-brand/40'
          : 'bg-[#f6f6f6] border-2 border-dashed border-[#ddd]'
      }`}>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => onChange(e.target.files?.[0]?.name ?? null)}
        />
        {file ? (
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 rounded-[10px] bg-brand/10 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#0f65ef" strokeWidth="1.8" />
                <polyline points="14 2 14 8 20 8" stroke="#0f65ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-black text-[13px] tracking-[-0.39px] truncate">{file}</p>
              <p className="text-[#969696] text-[11px] tracking-[-0.33px] mt-0.5">Tap to change</p>
            </div>
            <button
              onClick={e => { e.preventDefault(); onChange(null) }}
              className="w-7 h-7 rounded-full bg-white border border-[#e8e8e8] flex items-center justify-center flex-shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="#606060" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="17 8 12 3 7 8" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="3" x2="12" y2="15" stroke="#b0b0b0" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[#b0b0b0] text-[12px] tracking-[-0.36px]">Tap to upload</span>
            <span className="text-[#c8c8c8] text-[11px] tracking-[-0.33px] mt-[2px]">{hint}</span>
          </>
        )}
      </label>
    </div>
  )
}

export default function UploadDocumentsScreen({ go }: { go: (s: Screen) => void }) {
  const [cvFile, setCvFile]       = useState<string | null>(null)
  const [certFile, setCertFile]   = useState<string | null>(null)
  const [portfolio, setPortfolio] = useState('')

  return (
    <div className="screen flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6">
        {/* Back */}
        <button
          onClick={() => go('video-record')}
          className="mt-[56px] -ml-1 p-1 flex items-center gap-1 text-[#606060] text-[14px] tracking-[-0.42px]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#606060" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4">
          <StepDots current={2} />
          <div>
            <h1 className="font-bold text-[36px] tracking-[-1.08px] text-black leading-none mt-2">Upload documents</h1>
            <p className="text-[#606060] text-[15px] tracking-[-0.45px] leading-[1.5] mt-3 w-[270px]">
              Upload your CV and any relevant certificates.
            </p>
          </div>
        </div>

        {/* Uploads */}
        <div className="mt-7 flex flex-col gap-5 pb-6">
          <UploadBox
            label="CV / Resume"
            hint="PDF, DOC, DOCX · max 10 MB"
            accept=".pdf,.doc,.docx"
            file={cvFile}
            onChange={setCvFile}
          />
          <UploadBox
            label="Professional certificates"
            hint="PDF, JPG, PNG · max 10 MB"
            accept=".pdf,.jpg,.jpeg,.png"
            file={certFile}
            onChange={setCertFile}
          />

          {/* Portfolio */}
          <div className="flex flex-col gap-[8px]">
            <p className="text-[#606060] text-[14px] tracking-[-0.42px]">Portfolio / website link</p>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#b0b0b0" strokeWidth="1.8" />
                  <line x1="2" y1="12" x2="22" y2="12" stroke="#b0b0b0" strokeWidth="1.8" />
                  <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#b0b0b0" strokeWidth="1.8" />
                </svg>
              </div>
              <input
                type="url"
                placeholder="www.yourportfolio.com"
                value={portfolio}
                onChange={e => setPortfolio(e.target.value)}
                className="w-full bg-[#f6f6f6] border border-[#e8e8e8] rounded-full pl-10 pr-4 py-[14px] text-[14px] tracking-[-0.42px] text-black placeholder-[#b0b0b0] outline-none focus:border-brand transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 bg-white">
        <button
          onClick={() => go('profile-complete')}
          className="w-full bg-brand text-white text-[16px] tracking-[-0.48px] font-normal py-[15px] rounded-[999px]"
        >
          Finish setup
        </button>
        <button
          onClick={() => go('profile-complete')}
          className="w-full text-[#969696] text-[14px] tracking-[-0.42px] mt-3 py-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
