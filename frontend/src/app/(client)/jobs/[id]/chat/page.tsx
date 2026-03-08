"use client"

import { ChatHeader } from "@/components/booking/ChatHeader"
import { MessageBubble, Message } from "@/components/booking/MessageBubble"
import { ChatInputArea } from "@/components/booking/ChatInputArea"
import { useEffect, useRef } from "react"

// Mock message history
const MOCK_MESSAGES: Message[] = [
    { id: "1", text: "Hi, I've arrived at the Home Affairs branch.", timestamp: "08:12 AM", isClient: false },
    { id: "2", text: "The queue is moving steadily. I estimate I'll reach the front in about 45 minutes.", timestamp: "08:14 AM", isClient: false },
    { id: "3", text: "Great, thank you! I am nearby in the coffee shop.", timestamp: "08:16 AM", isClient: true },
    { id: "4", text: "Perfect. I'll message you when there are about 5 people ahead.", timestamp: "08:17 AM", isClient: false },
]

export default function ChatPage() {
    const bottomRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom on load
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' })
    }, [])

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative">

                <ChatHeader runnerName="Sipho M." isActive={true} />

                <main className="flex-1 overflow-y-auto px-4 py-6 flex flex-col">

                    <div className="flex justify-center mb-6">
                        <span className="bg-slate-200/50 text-slate-500 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                            Today
                        </span>
                    </div>

                    <div className="flex flex-col">
                        {MOCK_MESSAGES.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}
                        <div ref={bottomRef} className="h-4" />
                    </div>

                </main>

                <ChatInputArea />
            </div>
        </div>
    )
}
