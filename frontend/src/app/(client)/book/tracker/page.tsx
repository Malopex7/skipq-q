"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { PageHeader } from "@/components/ui/PageHeader"
import { RunnerProfileCard } from "@/components/booking/RunnerProfileCard"
import { EtaDisplay } from "@/components/booking/EtaDisplay"
import { QueueProgressTracker, QueueStep } from "@/components/booking/QueueProgressTracker"
import { Button } from "@/components/ui/button"
import { FileEdit, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

interface Job {
    _id: string
    status: "pending" | "accepted" | "en_route" | "at_branch" | "in_queue" | "proceed_to_branch" | "complete"
    runnerId?: {
        userId?: { name: string }
        rating?: number
    }
}

// Helper to calculate step status based on current job status
function getStepStatus(jobStatus: string, stepIds: string[], currentId: string) {
    const currentIndex = stepIds.indexOf(jobStatus)
    const thisIndex = stepIds.indexOf(currentId)

    if (thisIndex < currentIndex) return "complete"
    if (thisIndex === currentIndex) return "current"
    return "pending"
}

function TrackerContent() {
    const searchParams = useSearchParams()
    const jobId = searchParams.get("jobId")
    const [job, setJob] = useState<Job | null>(null)

    useEffect(() => {
        if (!jobId) return

        const fetchJob = () => {
            api.get<Job>(`/api/jobs/${jobId}`)
                .then(setJob)
                .catch(console.error)
        }

        fetchJob()
        const interval = setInterval(fetchJob, 5000)
        return () => clearInterval(interval)
    }, [jobId])

    if (!job) {
        return (
            <div className="w-full max-w-md bg-white border-x min-h-[100dvh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const flow = ["pending", "accepted", "en_route", "at_branch", "in_queue", "proceed_to_branch", "complete"]
    const status = flow.includes(job.status) ? job.status : "pending"

    const steps: QueueStep[] = [
        { id: "accepted", label: "Runner Accepted", status: getStepStatus(status, flow, "accepted") },
        { id: "en_route", label: "En Route to Branch", status: getStepStatus(status, flow, "en_route") },
        { id: "at_branch", label: "Arrived at Branch", status: getStepStatus(status, flow, "at_branch") },
        { id: "in_queue", label: "Waiting in Queue", status: getStepStatus(status, flow, "in_queue") },
        { id: "proceed_to_branch", label: "Near the Front (You proceed)", status: getStepStatus(status, flow, "proceed_to_branch") },
        { id: "complete", label: "Service Complete", status: getStepStatus(status, flow, "complete") },
    ]

    return (
        <div className="w-full max-w-md bg-white border-x min-h-[100dvh]">
            <PageHeader title="Live Queue Tracker" backHref="/dashboard" />

            <main className="px-6 py-6 pb-24">
                {job.runnerId ? (
                    <RunnerProfileCard
                        name={job.runnerId.userId?.name || "Runner"}
                        rating={job.runnerId.rating || 5.0}
                    />
                ) : (
                    <div className="bg-slate-50 border rounded-2xl p-6 text-center text-muted-foreground flex flex-col items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="text-sm font-medium">Finding the perfect runner for your queue...</p>
                    </div>
                )}

                <EtaDisplay minutes={45} timeRange="09:15 - 09:30 AM" />

                <div className="mt-8 mb-4">
                    <h3 className="text-lg font-bold text-foreground mb-4">Queue Progress</h3>
                    <div className="bg-slate-50 p-5 rounded-2xl border">
                        <QueueProgressTracker steps={steps} />
                    </div>
                </div>
            </main>

            <div className="fixed bottom-[72px] left-0 right-0 p-6 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
                <div className="max-w-md mx-auto">
                    <Button variant="outline" className="w-full h-14 text-base font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-transform">
                        <FileEdit className="mr-2 h-5 w-5" />
                        Update Instructions
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function LiveQueueTrackerPage() {
    return (
        <div className="min-h-[100dvh] bg-slate-50 flex justify-center pb-8">
            <Suspense fallback={<div className="w-full max-w-md bg-white border-x min-h-[100dvh] p-6 animate-pulse" />}>
                <TrackerContent />
            </Suspense>
        </div>
    )
}
