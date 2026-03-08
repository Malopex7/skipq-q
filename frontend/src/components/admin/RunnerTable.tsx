"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { api } from "@/lib/api"

interface Runner {
    _id: string
    status: string
    rating: number
    jobsCompleted: number
    isOnline: boolean
    userId?: { name: string; email: string }
}

const STATUS_COLOR: Record<string, string> = {
    active: "bg-green-50 text-green-700 ring-green-600/20",
    pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    suspended: "bg-red-50 text-red-700 ring-red-600/20",
}

function SkeletonRow() {
    return (
        <tr>{[...Array(5)].map((_, i) => <td key={i} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse w-24" /></td>)}</tr>
    )
}

export function RunnerTable() {
    const [runners, setRunners] = useState<Runner[]>([])
    const [loading, setLoading] = useState(true)

    const fetchRunners = () => {
        setLoading(true)
        api.get<Runner[]>("/api/runners")
            .then(data => setRunners(data.filter(r => r.status === "active" || r.status === "suspended")))
            .catch(() => setRunners([]))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchRunners() }, [])

    const handleSuspend = async (id: string) => {
        if (!confirm("Suspend this runner?")) return
        await api.patch(`/api/runners/${id}/suspend`)
        fetchRunners()
    }

    const handleUnsuspend = async (id: string) => {
        if (!confirm("Unsuspend this runner?")) return
        await api.patch(`/api/runners/${id}/unsuspend`)
        fetchRunners()
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Active Runners</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">All approved and verified queue runners.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Jobs Done</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading
                            ? [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                            : runners.length === 0
                                ? <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">No active runners yet</td></tr>
                                : runners.map((runner, i) => (
                                    <tr key={runner._id} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/40" : "bg-slate-50/50 hover:bg-slate-100/50"}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-900">{runner.userId?.name ?? "—"}</div>
                                            <div className="text-xs text-slate-500">{runner.userId?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{runner.jobsCompleted}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm font-semibold text-slate-800">{runner.rating.toFixed(1)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize ${STATUS_COLOR[runner.status] ?? "bg-slate-50 text-slate-700 ring-slate-200"}`}>
                                                {runner.isOnline ? "Online" : runner.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3">
                                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View</button>
                                            {runner.status === "active" ? (
                                                <button onClick={() => handleSuspend(runner._id)} className="text-sm font-semibold text-red-500 hover:text-red-700">Suspend</button>
                                            ) : (
                                                runner.status === "suspended" && (
                                                    <button onClick={() => handleUnsuspend(runner._id)} className="text-sm font-semibold text-green-600 hover:text-green-800">Unsuspend</button>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
