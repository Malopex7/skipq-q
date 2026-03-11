"use client"

import { useEffect, useState } from "react"
import { JobHistoryCard } from "@/components/dashboard/JobHistoryCard"

import { PageHeader } from "@/components/ui/PageHeader"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface Job {
    _id: string
    serviceType: string
    branchName: string
    status: string
    payAmount: number
    createdAt: string
}

export default function ClientMyJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get<Job[]>("/api/jobs/client/me")
            .then(setJobs)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const pastJobs = jobs.filter(j => ["complete", "cancelled"].includes(j.status))

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative pb-28">

                <PageHeader
                    title="My Jobs"
                    subtitle="Your booking history"
                    backHref="/dashboard"
                    className="bg-white"
                />

                <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : pastJobs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500 font-medium">No previous jobs found.</p>
                        </div>
                    ) : (
                        pastJobs.map(job => (
                            <JobHistoryCard
                                key={job._id}
                                id={job._id}
                                serviceName={job.serviceType}
                                branchName={job.branchName}
                                date={new Date(job.createdAt).toLocaleDateString("en-ZA", { month: "short", day: "numeric" })}
                                price={`R ${job.payAmount.toFixed(2)}`}
                                status={job.status as "completed" | "cancelled"}
                            />
                        ))
                    )}
                </main>


            </div>
        </div>
    )
}
