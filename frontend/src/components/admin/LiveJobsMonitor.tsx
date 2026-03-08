"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const TABS = ["All", "Matching", "En Route", "Waiting", "Near Front", "Complete", "Cancelled"] as const
type Tab = typeof TABS[number]

const STATUS_COLOR: Record<string, string> = {
    Matching: "bg-slate-100 text-slate-600",
    "En Route": "bg-blue-100 text-blue-700",
    Waiting: "bg-orange-100 text-orange-700",
    "Near Front": "bg-yellow-100 text-yellow-700",
    Complete: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
}

const JOBS = [
    { id: "JOB-2938", client: "Thabo M.", runner: "Sipho K.", service: "Smart ID", branch: "Randburg", status: "Waiting", time: "1h 45m" },
    { id: "JOB-2939", client: "Sarah J.", runner: "David N.", service: "Vehicle License", branch: "Sandton", status: "Near Front", time: "22m" },
    { id: "JOB-2940", client: "Michael R.", runner: "Lerato P.", service: "Passport", branch: "Edenvale", status: "En Route", time: "55m" },
    { id: "JOB-2941", client: "Aisha T.", runner: "Matching...", service: "Smart ID", branch: "Midrand", status: "Matching", time: "5m" },
    { id: "JOB-2935", client: "Brian L.", runner: "Thandeka D.", service: "Smart ID", branch: "Soshanguve", status: "Complete", time: "3h 10m" },
    { id: "JOB-2932", client: "Nandi W.", runner: "N/A", service: "Vehicle License", branch: "Roodepoort", status: "Cancelled", time: "45m" },
]

export function LiveJobsMonitor() {
    const [activeTab, setActiveTab] = useState<Tab>("All")

    const filtered = activeTab === "All" ? JOBS : JOBS.filter(j => j.status === activeTab)

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Tab Row */}
            <div className="border-b border-slate-200 px-6 pt-4 flex gap-1 overflow-x-auto pb-0">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 whitespace-nowrap transition-colors",
                            activeTab === tab
                                ? "border-primary text-primary bg-primary/5"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        )}
                    >
                        {tab}
                        {tab !== "All" && (
                            <span className="ml-1.5 text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                                {JOBS.filter(j => j.status === tab).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service & Branch</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Elapsed</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map((job, i) => (
                            <tr key={job.id} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/50" : "bg-slate-50/50 hover:bg-slate-100/50"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600 hover:underline cursor-pointer">{job.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{job.client}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{job.runner}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{job.service}</div>
                                    <div className="text-xs text-slate-500">{job.branch}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${STATUS_COLOR[job.status] ?? "bg-slate-100 text-slate-600"}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">{job.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3">
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View</button>
                                    {!["Complete", "Cancelled"].includes(job.status) && (
                                        <button className="text-sm font-semibold text-orange-500 hover:text-orange-700">Intervene</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-400 font-medium">No jobs match this filter.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
