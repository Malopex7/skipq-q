"use client"

import { useEffect, useState } from "react"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"
import { JobFeedCard } from "@/components/runner/JobFeedCard"
import { api } from "@/lib/api"
import { Briefcase } from "lucide-react"

interface Job {
    _id: string
    serviceType: string
    branchName: string
    address: string
    scheduledTime: string
    payAmount: number
    status: string
}

export default function ActiveJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch jobs assigned to this runner
        api.get<Job[]>("/api/jobs/runner/me")
            .then(data => setJobs(data.filter(j => j.status !== 'complete' && j.status !== 'cancelled')))
            .catch(() => setJobs([]))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex justify-center bg-black min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-950 border-x border-slate-900 min-h-[100dvh] flex flex-col relative pb-28">

                {/* Header */}
                <div className="px-6 pt-10 pb-6 bg-slate-950 sticky top-0 z-20 border-b border-slate-900 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-lg bg-[#80f20d]/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-[#80f20d]" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">Active Jobs</h1>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">Manage your current assignments</p>
                </div>

                {/* Jobs List */}
                <main className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
                    {loading
                        ? [...Array(2)].map((_, i) => (
                            <div key={i} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 animate-pulse h-40" />
                        ))
                        : jobs.length === 0
                            ? (
                                <div className="text-center py-20 px-6">
                                    <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-800">
                                        <Briefcase className="h-8 w-8 text-slate-700" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">No active jobs</h3>
                                    <p className="text-slate-500 text-sm">You haven&apos;t accepted any jobs yet. Check the feed for available opportunities.</p>
                                </div>
                            )
                            : jobs.map(job => (
                                <JobFeedCard
                                    key={job._id}
                                    id={job._id}
                                    serviceName={job.serviceType}
                                    branchName={job.branchName}
                                    distance={job.address || "—"}
                                    scheduledTime={new Date(job.scheduledTime).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                                    duration={job.status.replace('_', ' ')}
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
