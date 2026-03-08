"use client"

import { useEffect, useState } from "react"
import { Briefcase, CheckCircle, DollarSign, Star, XCircle, Bell } from "lucide-react"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"
import { api } from "@/lib/api"

interface Notif {
    _id: string
    type: string
    title: string
    body: string
    isRead: boolean
    createdAt: string
}

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
    const [notifs, setNotifs] = useState<Notif[]>([])
    const [loading, setLoading] = useState(true)

    const fetchNotifs = () => {
        api.get<Notif[]>("/api/notifications")
            .then(setNotifs)
            .catch(() => setNotifs([]))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchNotifs() }, [])

    const markAllRead = async () => {
        await api.patch("/api/notifications/read-all")
        setNotifs(prev => prev.map(n => ({ ...n, isRead: true })))
    }

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
                    {loading
                        ? [...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-start gap-4 px-6 py-4 animate-pulse">
                                <div className="h-11 w-11 rounded-full bg-slate-100 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                                    <div className="h-3 bg-slate-100 rounded w-full" />
                                </div>
                            </div>
                        ))
                        : notifs.length === 0
                            ? <p className="text-center text-slate-400 text-sm mt-16">No notifications yet</p>
                            : notifs.map(n => {
                                const { icon: Icon, bg, color } = ICON_MAP[n.type as NotifType] ?? ICON_MAP.system
                                const unread = !n.isRead
                                return (
                                    <button
                                        key={n._id}
                                        onClick={() => setNotifs(prev => prev.map(x => x._id === n._id ? { ...x, isRead: true } : x))}
                                        className={`w-full flex items-start gap-4 px-6 py-4 text-left transition-colors ${unread ? "bg-[#80f20d]/5 hover:bg-[#80f20d]/10" : "bg-white hover:bg-slate-50"}`}
                                    >
                                        <div className={`h-11 w-11 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                                            <Icon className={`h-5 w-5 ${color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className={`text-sm leading-tight ${unread ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>{n.title}</p>
                                                {unread && <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-1" />}
                                            </div>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-2">{n.body}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold mt-1">
                                                {new Date(n.createdAt).toLocaleString("en-ZA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </div>
                                    </button>
                                )
                            })
                    }
                </div>

                <RunnerBottomNav />
            </div>
        </div>
    )
}
