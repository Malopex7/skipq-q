"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function OnlineToggle() {
    const [isOnline, setIsOnline] = useState(true)

    return (
        <button
            onClick={() => setIsOnline(!isOnline)}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors",
                isOnline
                    ? "bg-[#80f20d]/20 text-[#80f20d] border border-[#80f20d]/30"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
            )}
        >
            <div className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                isOnline ? "bg-[#80f20d] shadow-[0_0_8px_#80f20d]" : "bg-slate-500"
            )} />
            {isOnline ? "Online" : "Offline"}
        </button>
    )
}
