"use client"

import { useEffect, useState } from "react"
import { OnlineToggle } from "@/components/runner/OnlineToggle"
import { JobFeedCard } from "@/components/runner/JobFeedCard"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"
import { api } from "@/lib/api"

interface Job {
    _id: string
    serviceType: string
    branchName: string
    address: string
    scheduledTime: string
    payAmount: number
}

export default function RunnerDashboardPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get<Job[]>("/api/jobs")
            .then(data => setJobs(data))
            .catch(() => setJobs([]))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex justify-center bg-black min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-950 border-x border-slate-900 min-h-[100dvh] flex flex-col relative pb-28">

                {/* Header */}
                <div className="px-6 pt-10 pb-6 bg-slate-950 sticky top-0 z-20 border-b border-slate-900 shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Available Jobs</h1>
                            <p className="text-sm text-slate-400 font-medium">Near Johannesburg</p>
                        </div>
                        <OnlineToggle />
                    </div>

                    <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl">
                        <span className="text-sm font-medium text-slate-400">Today&apos;s Earnings:</span>
                        <span className="font-bold text-white">R 0.00</span>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-6 py-4">
                    <button className="whitespace-nowrap bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-full shadow-sm">All Services</button>
                    <button className="whitespace-nowrap bg-slate-900 text-slate-300 font-semibold text-xs px-4 py-2 rounded-full border border-slate-800">&lt; 5km</button>
                    <button className="whitespace-nowrap bg-slate-900 text-slate-300 font-semibold text-xs px-4 py-2 rounded-full border border-slate-800">Morning Only</button>
                </div>

                {/* Feed */}
                <main className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
                    {loading
                        ? [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 animate-pulse h-36" />
                        ))
                        : jobs.length === 0
                            ? <p className="text-center text-slate-500 text-sm mt-12">No available jobs right now.</p>
                            : jobs.map(job => (
                                <JobFeedCard
                                    key={job._id}
                                    id={job._id}
                                    serviceName={job.serviceType}
                                    branchName={job.branchName}
                                    distance={job.address || "—"}
                                    scheduledTime={new Date(job.scheduledTime).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                                    duration="—"
                                    payAmount={`R ${job.payAmount}`}
                                />
                            ))
                    }
                </main>

                <RunnerBottomNav />
            </div>
        </div>
    )
}
