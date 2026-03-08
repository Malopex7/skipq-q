"use client"

import { Home, ClipboardList, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function ClientBottomNav() {
    const pathname = usePathname()

    const tabs = [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "My Jobs", href: "/jobs", icon: ClipboardList },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Profile", href: "/profile", icon: User },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t pb-safe pt-2 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] pb-2">
            <div className="max-w-md mx-auto flex items-center justify-between">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 w-16 h-14",
                                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <tab.icon className={cn("h-6 w-6 transition-transform", isActive && "scale-110")} />
                            <span className="text-[10px] font-semibold">{tab.name}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
