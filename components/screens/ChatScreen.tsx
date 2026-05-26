'use client'
import { useState } from 'react'
import { ChevronLeft, CheckCheck, Paperclip, ArrowUp, MoreVertical, CheckCircle2, AlertTriangle } from 'lucide-react'
import type { Screen } from '@/lib/types'

type Message = {
  id: string
  from: 'recruiter' | 'user'
  text: string
  time: string
  read?: boolean
}

const INITIAL_MESSAGES: Message[] = [
  { id: 'm1', from: 'recruiter', text: "Hi! I'm Tunde from Seepco. I reviewed your profile and would love to have a chat about the Sales Assistant role.", time: '10:32 AM' },
  { id: 'm2', from: 'user', text: "Hi Tunde! Thanks for reaching out. I'm very interested in the opportunity.", time: '10:45 AM', read: true },
  { id: 'm3', from: 'recruiter', text: "Great! Could you tell me a bit about your previous sales experience?", time: '10:47 AM' },
]

export default function ChatScreen({ go }: { go: (s: Screen) => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      from: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }])
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Top bar */}
      <div className="flex-shrink-0 pt-safe border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => go('messages')} className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-2">
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center font-bold text-sm flex-shrink-0">S</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-semibold text-sm">Seepco Nigeria</p>
              <CheckCircle2 size={13} className="text-brand fill-brand flex-shrink-0" />
            </div>
            <p className="text-[#666] text-xs">Seepco · Verified Employer</p>
          </div>

          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-2">
            <MoreVertical size={18} className="text-[#888]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 flex flex-col gap-3">
        {/* System message */}
        <div className="text-center">
          <span className="text-[#555] text-[11px] bg-dark-2 px-3 py-1 rounded-full">
            You matched with Seepco for Sales Assistant · Mon, 25 Aug
          </span>
        </div>

        {/* Safety banner */}
        <div className="bg-[#1a1400] border border-yellow-600/30 rounded-2xl p-3 flex items-start gap-2">
          <AlertTriangle size={14} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-500/80 text-[11px] leading-relaxed">
            Legitimate employers never ask you to pay fees. Report suspicious activity.
          </p>
        </div>

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[78%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-brand text-white rounded-tr-sm'
                    : 'bg-dark-3 text-white rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 px-1">
                <span className="text-[#555] text-[10px]">{msg.time}</span>
                {msg.from === 'user' && (
                  <CheckCheck size={12} className={msg.read ? 'text-brand' : 'text-[#555]'} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 border-t border-[#1f1f1f] bg-dark-2 px-4 py-3 pb-safe flex items-end gap-3">
        <button className="text-[#555] mb-1 flex-shrink-0">
          <Paperclip size={20} />
        </button>
        <div className="flex-1 bg-dark-3 rounded-2xl px-4 py-2.5 min-h-[44px] flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="w-full bg-transparent text-white text-sm placeholder-[#555] outline-none"
          />
        </div>
        <button
          onClick={sendMessage}
          className="w-10 h-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
        >
          <ArrowUp size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}
