"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface Runner {
    _id: string
    userId: { name: string }
    status: string
    createdAt: string
}

export function PendingRunnersList() {
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
                day: 'numeric'
            })
        } catch {
            return "Unknown Date"
        }
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-900">Pending Applications</h2>
                {runners.length > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {runners.length} New
                    </span>
                )}
            </div>

            <div className="p-2 overflow-y-auto flex-1 h-[400px]">
                {loading ? (
                    <div className="p-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>
                ) : runners.length === 0 ? (
                    <div className="p-8 text-center text-sm font-semibold text-slate-400">No pending applications</div>
                ) : (
                    runners.map((runner) => (
                        <div key={runner._id} className="flex flex-col gap-3 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{runner.userId?.name || "Unknown"}</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                        Applied: {formatDate(runner.createdAt)}
                                    </p>
                                </div>
                                <button className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">
                                    View Docs
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <Button
                                    onClick={() => handleAction(runner._id, "active")}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-xs font-bold text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800"
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={() => handleAction(runner._id, "suspended")}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-xs font-bold text-red-700 border-red-200 hover:bg-red-50 hover:text-red-800"
                                >
                                    Reject
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
