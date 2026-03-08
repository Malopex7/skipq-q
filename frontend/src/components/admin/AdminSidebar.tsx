"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    UserSquare2,
    Briefcase,
    Settings2,
    AlertTriangle,
    BarChart3,
    LogOut
} from "lucide-react"

const NAV_LINKS = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Runners", href: "/admin/runners", icon: UserSquare2 },
    { name: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Settings2 },
    { name: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-[250px] bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">

            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="bg-[#80f20d] p-1.5 rounded-lg">
                        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-black text-white tracking-tight">SkipQ Admin</span>
                </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-[#80f20d]/10 text-[#80f20d] font-bold"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <link.icon className={cn("h-5 w-5", isActive ? "text-[#80f20d]" : "text-slate-500")} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-800 shrink-0">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 w-full transition-colors">
                    <LogOut className="h-5 w-5 text-slate-500" />
                    Sign Out
                </button>
            </div>

        </aside>
    )
}
