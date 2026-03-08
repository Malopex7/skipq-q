"use client"

import { useEffect, useState } from "react"
import { Briefcase, Users, UserSquare2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { api } from "@/lib/api"

interface StatCardProps {
    title: string
    value: string
    trend: "up" | "down" | "neutral"
    trendValue: string
    icon: React.ElementType
    loading?: boolean
}

function StatCard({ title, value, trend, trendValue, icon: Icon, loading }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Icon className="h-5 w-5 text-slate-600" />
                </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {loading ? <span className="inline-block w-12 h-8 bg-slate-100 animate-pulse rounded" /> : value}
                </span>
                <div className="flex items-center gap-1 mb-1">
                    {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                        {trendValue}
                    </span>
                </div>
            </div>
        </div>
    )
}

interface StatsData {
    activeJobs: number
    clients: number
    activeRunners: number
    openDisputes: number
}

export function AdminStatsRow() {
    const [stats, setStats] = useState<StatsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get<unknown[]>("/api/jobs"),
            api.get<unknown[]>("/api/users"),
            api.get<unknown[]>("/api/runners"),
            api.get<unknown[]>("/api/disputes"),
        ])
            .then(([jobs, users, runners, disputes]) => {
                setStats({
                    activeJobs: (jobs as { status: string }[]).filter(j => !["complete", "cancelled"].includes(j.status)).length,
                    clients: (users as { role: string }[]).filter(u => u.role === "client").length,
                    activeRunners: (runners as { status: string }[]).filter(r => r.status === "active").length,
                    openDisputes: (disputes as { status: string }[]).filter(d => d.status === "open").length,
                })
            })
            .catch(() => setStats({ activeJobs: 0, clients: 0, activeRunners: 0, openDisputes: 0 }))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Active Jobs" value={String(stats?.activeJobs ?? 0)} trend="up" trendValue="+12%" icon={Briefcase} loading={loading} />
            <StatCard title="Registered Clients" value={String(stats?.clients ?? 0)} trend="up" trendValue="+5.2%" icon={Users} loading={loading} />
            <StatCard title="Active Runners" value={String(stats?.activeRunners ?? 0)} trend="neutral" trendValue="—" icon={UserSquare2} loading={loading} />
            <StatCard title="Open Disputes" value={String(stats?.openDisputes ?? 0)} trend="down" trendValue="-2" icon={AlertTriangle} loading={loading} />
        </div>
    )
}
