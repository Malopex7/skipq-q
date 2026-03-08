"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

interface Runner {
    _id: string
    userId: { name: string }
    status: string
    createdAt: string
}

export function PendingApplicationsTable() {
    const [runners, setRunners] = useState<Runner[]>([])
    const [loading, setLoading] = useState(true)

    const fetchRunners = () => {
        setLoading(true)
        api.get<Runner[]>("/api/runners")
            .then(data => setRunners(data.filter(r => r.status === "pending")))
            .catch(console.error)
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchRunners() }, [])

    const handleAction = async (id: string, action: "active" | "suspended") => {
        try {
            await api.patch(`/api/runners/${id}`, { status: action })
            fetchRunners() // refresh list
        } catch (error) {
            console.error("Failed to update runner status", error)
            alert("Failed to update status")
        }
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            })
        } catch {
            return "Unknown Date"
        }
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Pending Applications</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Awaiting ID verification and approval.</p>
                </div>
                {runners.length > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">{runners.length} Pending</span>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID Document</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin text-slate-400 mx-auto" />
                                </td>
                            </tr>
                        ) : runners.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-sm font-semibold text-slate-400">
                                    No pending applications
                                </td>
                            </tr>
                        ) : (
                            runners.map((runner, i) => (
                                <tr key={runner._id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{runner.userId?.name || "Unknown"}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{formatDate(runner.createdAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            View ID
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex justify-end gap-2">
                                            <Button onClick={() => handleAction(runner._id, "active")} size="sm" className="h-8 text-xs font-bold bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                                            <Button onClick={() => handleAction(runner._id, "suspended")} size="sm" variant="outline" className="h-8 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50">Reject</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
