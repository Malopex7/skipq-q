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
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200"
            )}
        >
            <div className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-slate-400"
            )} />
            {isOnline ? "Online" : "Offline"}
        </button>
    )
}
