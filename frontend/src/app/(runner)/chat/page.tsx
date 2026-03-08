"use client"

import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

const INITIAL_MESSAGES = [
    { from: "client", text: "Hi, are you on your way?", time: "10:14 AM" },
    { from: "runner", text: "Yes, I'm 5 minutes away!", time: "10:15 AM" },
    { from: "client", text: "Great, I'll meet you at the main entrance.", time: "10:15 AM" },
]

const QUICK_REPLIES = ["I've arrived", "Almost done", "5 mins away"]

export default function RunnerChatPage() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [input, setInput] = useState("")

    const send = (text: string) => {
        if (!text.trim()) return
        setMessages(prev => ([...prev, { from: "runner", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]))
        setInput("")
    }

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 min-h-[100dvh] flex flex-col">

                {/* Header */}
                <div className="bg-slate-900 pt-12 pb-4 px-4 flex items-center gap-3 shrink-0">
                    <Link href="/jobs" className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div className="h-10 w-10 rounded-full bg-[#80f20d] flex items-center justify-center font-black text-slate-900 text-lg shrink-0">T</div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-base leading-tight truncate">Thabo M.</p>
                        <span className="inline-block bg-[#80f20d]/20 text-[#80f20d] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active Job</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex flex-col gap-0.5 ${msg.from === "runner" ? "items-end" : "items-start"}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium ${msg.from === "runner"
                                    ? "bg-[#80f20d] text-slate-900 rounded-br-sm"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm"
                                }`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium px-1">{msg.time}</span>
                        </div>
                    ))}
                </div>

                {/* Quick Replies */}
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto shrink-0">
                    {QUICK_REPLIES.map(r => (
                        <button
                            key={r}
                            onClick={() => send(r)}
                            className="whitespace-nowrap text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:bg-slate-50 active:scale-95 transition-transform shrink-0"
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {/* Input Bar */}
                <div className="px-4 pb-8 pt-2 bg-white border-t border-slate-100 flex gap-3 items-center shrink-0">
                    <input
                        type="text"
                        placeholder="Message client..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && send(input)}
                        className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#80f20d]/40"
                    />
                    <button
                        onClick={() => send(input)}
                        className="h-10 w-10 bg-[#80f20d] rounded-full flex items-center justify-center text-slate-900 shadow-md active:scale-95 transition-transform shrink-0"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>

            </div>
        </div>
    )
}
