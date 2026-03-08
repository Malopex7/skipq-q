"use client"

import { Send, Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const REPLIES = [
    "How long?",
    "Are you there?",
    "Thank you!",
    "I'm on my way"
]

export function ChatInputArea() {
    const [text, setText] = useState("")

    return (
        <div className="sticky bottom-0 bg-slate-50 border-t pb-safe pt-2 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-20">

            {/* Quick Replies */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-1 scrollbar-none -mx-4 px-4">
                {REPLIES.map((reply) => (
                    <button
                        key={reply}
                        onClick={() => setText(reply)}
                        className="whitespace-nowrap rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        {reply}
                    </button>
                ))}
            </div>

            {/* Input Row */}
            <div className="flex items-end gap-2 pb-4">
                <button className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                    <Plus className="h-6 w-6" />
                </button>

                <div className="flex-1 bg-white border rounded-3xl min-h-[48px] px-4 py-3 shadow-inner-[0_2px_4px_rgba(0,0,0,0.02)] flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-transparent border-none p-0 focus:outline-none text-[15px]"
                    />
                </div>

                <button
                    className={cn(
                        "h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full transition-all",
                        text.trim() ? "bg-primary text-white shadow-md hover:bg-primary/90" : "bg-slate-200 text-slate-400"
                    )}
                    disabled={!text.trim()}
                >
                    <Send className="h-5 w-5 ml-1" />
                </button>
            </div>

        </div>
    )
}
