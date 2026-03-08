"use client"

import { ListTodo, CheckCircle2, Wallet, UserCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function RunnerBottomNav() {
    const pathname = usePathname()

    const tabs = [
        { name: "Feed", href: "/jobs", icon: ListTodo },
        { name: "Active", href: "/active", icon: CheckCircle2 },
        { name: "Earnings", href: "/earnings", icon: Wallet },
        { name: "Profile", href: "/profile", icon: UserCircle },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800 pt-3 px-6 pb-safe mb-2">
            <div className="max-w-md mx-auto flex items-center justify-between">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1.5 w-16 h-14 transition-colors",
                                isActive ? "text-[#80f20d]" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <tab.icon className={cn("h-6 w-6 transition-transform", isActive && "scale-110")} />
                            <span className="text-[10px] font-bold">{tab.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
