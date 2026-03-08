"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ActiveJobBanner } from "@/components/dashboard/ActiveJobBanner"
import { JobHistoryCard } from "@/components/dashboard/JobHistoryCard"
import { ClientBottomNav } from "@/components/dashboard/ClientBottomNav"
import { Plus } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

interface Job {
    _id: string
    serviceType: string
    branchName: string
    status: string
    payAmount: number
    createdAt: string
    runnerId?: { userId?: { name: string } }
}

interface User {
    name: string
    avatarUrl?: string
}

export default function ClientDashboardPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            api.get<Job[]>("/api/jobs/client/me"),
            api.get<User>("/api/auth/me")
        ])
            .then(([jobsData, userData]) => {
                setJobs(jobsData)
                setUser(userData)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const activeJobs = jobs.filter(j => !["complete", "cancelled"].includes(j.status))
    const pastJobs = jobs.filter(j => ["complete", "cancelled"].includes(j.status))

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative pb-28">

                <DashboardHeader
                    userName={user?.name.split(" ")[0] || "Guest"}
                    avatarUrl={user?.avatarUrl}
                />

                <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-8">
                    {loading ? (
                        <div className="animate-pulse flex flex-col gap-8">
                            <div className="h-40 bg-slate-200 rounded-3xl" />
                            <div className="space-y-3">
                                <div className="h-20 bg-slate-200 rounded-2xl" />
                                <div className="h-20 bg-slate-200 rounded-2xl" />
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeJobs.length > 0 && (
                                <section className="flex flex-col gap-4">
                                    {activeJobs.map(job => (
                                        <ActiveJobBanner
                                            key={job._id}
                                            jobId={job._id}
                                            runnerName={job.runnerId?.userId?.name || "Looking for runner"}
                                            branchName={job.branchName}
                                            status={job.status}
                                        />
                                    ))}
                                </section>
                            )}

                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
                                    <Link href="/jobs" className="text-sm font-semibold text-primary hover:underline">
                                        View All
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {pastJobs.length === 0 ? (
                                        <p className="text-sm text-slate-500 text-center py-6">No previous jobs.</p>
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
                                </div>
                            </section>
                        </>
                    )}
                </main>

                {/* Floating Action Button */}
                <Link
                    href="/book"
                    className="fixed bottom-24 right-4 md:right-[calc(50%-13rem)] z-40 bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 font-bold py-4 px-6 rounded-full shadow-lg shadow-[#80f20d]/30 flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <Plus className="h-5 w-5 stroke-[3]" />
                    Book New Queue
                </Link>

                <ClientBottomNav />
            </div>
        </div>
    )
}
