import CandidateApp from '@/components/CandidateApp'

export default function Page() {
  return (
    <div className="min-h-screen min-h-svh bg-black flex items-center justify-center">
      {/* Desktop: phone frame wrapper. Mobile: fills screen */}
      <div className="w-full max-w-[390px] h-screen h-svh max-h-[844px] bg-dark relative overflow-hidden font-display">
        <CandidateApp />
      </div>
    </div>
  )
}
