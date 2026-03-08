"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

interface Job {
    _id: string
    serviceType: string
    branchName: string
    status: string
    payAmount: number
    createdAt: string
    clientId?: { name: string }
    runnerId?: { userId?: { name: string } }
}

const STATUS_COLORS: Record<string, string> = {
    matching: "bg-slate-100 text-slate-700 ring-slate-600/20",
    enRoute: "bg-blue-50 text-blue-700 ring-blue-600/20",
    waiting: "bg-orange-50 text-orange-700 ring-orange-600/20",
    nearFront: "bg-purple-50 text-purple-700 ring-purple-600/20",
    complete: "bg-green-50 text-green-700 ring-green-600/20",
    cancelled: "bg-red-50 text-red-700 ring-red-600/20",
}

const STATUS_LABELS: Record<string, string> = {
    matching: "Matching", enRoute: "En Route", waiting: "Waiting",
    nearFront: "Near Front", complete: "Complete", cancelled: "Cancelled",
}

function SkeletonRow() {
    return (
        <tr>
            {[...Array(6)].map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <div className="h-4 bg-slate-100 rounded animate-pulse w-24" />
                </td>
            ))}
        </tr>
    )
}

export function ActiveJobsTable() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)

    const fetchJobs = () => {
        setLoading(true)
        api.get<Job[]>("/api/jobs")
            .then(data => setJobs(data.filter(j => !["complete", "cancelled"].includes(j.status))))
            .catch(() => setJobs([]))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchJobs() }, [])

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-900">Live Active Jobs</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8" onClick={fetchJobs}>
                        <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service & Branch</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pay</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading
                            ? [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
                            : jobs.length === 0
                                ? <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400">No active jobs right now</td></tr>
                                : jobs.map(job => (
                                    <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-slate-600">{job.clientId?.name ?? "—"}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{job.runnerId?.userId?.name ?? "Matching…"}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="font-medium text-slate-900">{job.serviceType}</div>
                                            <div className="text-xs text-slate-500">{job.branchName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_COLORS[job.status] ?? "bg-slate-50 text-slate-700 ring-slate-200"}`}>
                                                {STATUS_LABELS[job.status] ?? job.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-600">R {job.payAmount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
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
