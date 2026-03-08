"use client"

import { useState } from "react"
import { Briefcase, CheckCircle, DollarSign, Star, XCircle, Bell } from "lucide-react"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"

const NOTIFICATIONS = [
    { id: "n1", type: "job", title: "New Job Available", body: "Smart ID queue at Randburg HA — R 85.00", time: "2m ago", unread: true },
    { id: "n2", type: "accepted", title: "Job Accepted", body: "JOB-2938 has been confirmed and assigned to you.", time: "1h ago", unread: true },
    { id: "n3", type: "payout", title: "Payout Received", body: "R 420.00 has been transferred to your wallet.", time: "Yesterday", unread: false },
    { id: "n4", type: "rating", title: "New Rating Received", body: "Thabo M. gave you ⭐⭐⭐⭐⭐ for JOB-2931.", time: "Yesterday", unread: false },
    { id: "n5", type: "cancelled", title: "Job Cancelled", body: "JOB-2918 was cancelled by the client.", time: "Oct 23", unread: false },
]

const ICON_MAP = {
    job: { icon: Bell, bg: "bg-[#80f20d]/15", color: "text-slate-900" },
    accepted: { icon: CheckCircle, bg: "bg-blue-100", color: "text-blue-600" },
    payout: { icon: DollarSign, bg: "bg-green-100", color: "text-green-600" },
    rating: { icon: Star, bg: "bg-yellow-100", color: "text-yellow-600" },
    cancelled: { icon: XCircle, bg: "bg-red-100", color: "text-red-500" },
    system: { icon: Briefcase, bg: "bg-slate-100", color: "text-slate-500" },
}

type NotifType = keyof typeof ICON_MAP

export default function RunnerNotificationsPage() {
    const [notifs, setNotifs] = useState(NOTIFICATIONS)

    const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })))

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-white min-h-[100dvh] flex flex-col pb-24">

                {/* Header */}
                <div className="pt-14 px-6 pb-4 flex items-center justify-between border-b border-slate-100 bg-white">
                    <h1 className="text-2xl font-black text-slate-900">Notifications</h1>
                    <button onClick={markAllRead} className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                        Mark All Read
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 divide-y divide-slate-100">
                    {notifs.map(n => {
                        const { icon: Icon, bg, color } = ICON_MAP[n.type as NotifType] ?? ICON_MAP.system
                        return (
                            <button
                                key={n.id}
                                onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
                                className={`w-full flex items-start gap-4 px-6 py-4 text-left transition-colors ${n.unread ? "bg-[#80f20d]/5 hover:bg-[#80f20d]/10" : "bg-white hover:bg-slate-50"}`}
                            >
                                <div className={`h-11 w-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                                    <Icon className={`h-5 w-5 ${color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={`text-sm leading-tight ${n.unread ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>{n.title}</p>
                                        {n.unread && <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-1" />}
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-2">{n.body}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold mt-1">{n.time}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <RunnerBottomNav active="jobs" />
            </div>
        </div>
    )
}
