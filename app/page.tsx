import CandidateApp from '@/components/CandidateApp'

export default function Page() {
  return (
    <div className="min-h-screen min-h-svh bg-[#f0f0f0] flex items-center justify-center">
      <div className="w-full max-w-[430px] h-screen h-svh bg-white relative overflow-hidden font-display shadow-2xl">
        <CandidateApp />
      </div>
    </div>
  )
}
