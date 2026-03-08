"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const DISPUTES = [
    { id: "DSP-001", client: "Thabo M.", runner: "Sipho K.", jobId: "JOB-2901", issue: "No-show", date: "Oct 25, 2023", status: "Open" },
    { id: "DSP-002", client: "Sarah J.", runner: "David N.", jobId: "JOB-2871", issue: "Late Arrival", date: "Oct 22, 2023", status: "Investigating" },
    { id: "DSP-003", client: "Michael R.", runner: "Lerato P.", jobId: "JOB-2855", issue: "Quality Issue", date: "Oct 20, 2023", status: "Resolved" },
    { id: "DSP-004", client: "Aisha T.", runner: "Thandeka D.", jobId: "JOB-2803", issue: "No-show", date: "Oct 18, 2023", status: "Open" },
    { id: "DSP-005", client: "Brian L.", runner: "Sipho K.", jobId: "JOB-2799", issue: "Wrong Branch", date: "Oct 15, 2023", status: "Resolved" },
]

type Dispute = typeof DISPUTES[0]

const STATUS_COLOR: Record<string, string> = {
    Open: "bg-red-100 text-red-700 ring-red-600/20",
    Investigating: "bg-orange-100 text-orange-700 ring-orange-600/20",
    Resolved: "bg-green-100 text-green-700 ring-green-600/20",
}

interface DisputesTableProps {
    onSelect: (d: Dispute) => void
    selectedId: string | null
}

export function DisputesTable({ onSelect, selectedId }: DisputesTableProps) {
    const [statusFilter, setStatusFilter] = useState("All")
    const [issueFilter, setIssueFilter] = useState("All")

    const filtered = DISPUTES.filter(d => {
        const matchStatus = statusFilter === "All" || d.status === statusFilter
        const matchIssue = issueFilter === "All" || d.issue === issueFilter
        return matchStatus && matchIssue
    })

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-4 flex-wrap">
                <h2 className="text-lg font-bold text-slate-900 mr-auto">Disputes</h2>
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                >
                    <option value="All">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                </select>
                <select
                    value={issueFilter}
                    onChange={e => setIssueFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                >
                    <option value="All">All Issue Types</option>
                    <option value="No-show">No-show</option>
                    <option value="Late Arrival">Late Arrival</option>
                    <option value="Quality Issue">Quality Issue</option>
                    <option value="Wrong Branch">Wrong Branch</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Dispute ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map((d) => (
                            <tr
                                key={d.id}
                                onClick={() => onSelect(d)}
                                className={`cursor-pointer transition-colors ${selectedId === d.id
                                        ? "bg-blue-50 border-l-2 border-blue-500"
                                        : d.status === "Open"
                                            ? "bg-red-50/50 hover:bg-red-50"
                                            : "bg-white hover:bg-slate-50"
                                    }`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{d.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{d.client}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{d.runner}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{d.jobId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{d.issue}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{d.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_COLOR[d.status]}`}>
                                        {d.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={e => { e.stopPropagation(); onSelect(d); }}
                                        className="h-7 text-xs font-semibold"
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">No disputes match this filter.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export type { Dispute }
