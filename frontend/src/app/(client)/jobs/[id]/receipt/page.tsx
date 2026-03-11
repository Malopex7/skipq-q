"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CompletionHeader } from "@/components/booking/CompletionHeader"
import { ReceiptSummaryCard } from "@/components/booking/ReceiptSummaryCard"
import { RunnerRating } from "@/components/booking/RunnerRating"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

interface Job {
    _id: string
    branchName: string
    payAmount: number
    createdAt: string
    updatedAt: string
    runnerId?: {
        userId?: { name: string }
    }
}

export default function ReceiptPage() {
    const params = useParams()
    const jobId = params.id as string

    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!jobId) return
        api.get<Job>(`/api/jobs/${jobId}`)
            .then(setJob)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [jobId])

    if (loading) {
        return (
            <div className="flex justify-center bg-white min-h-[100dvh] items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="flex justify-center bg-white min-h-[100dvh] items-center flex-col gap-4">
                <p>Job not found</p>
                <Button asChild><Link href="/dashboard">Back to Home</Link></Button>
            </div>
        )
    }

    // Naive duration calculation
    const start = new Date(job.createdAt).getTime()
    const end = new Date(job.updatedAt).getTime()
    const diffMins = Math.round((end - start) / 60000)
    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}mins`

    return (
        <div className="flex justify-center bg-white min-h-[100dvh]">
            <div className="w-full max-w-md border-x min-h-[100dvh] flex flex-col relative">
                <main className="flex-1 overflow-y-auto px-6 pb-32">

                    <CompletionHeader />

                    <ReceiptSummaryCard
                        branchName={job.branchName}
                        runnerName={job.runnerId?.userId?.name || "Runner"}
                        duration={durationStr}
                        totalCost={`R ${job.payAmount.toFixed(2)}`}
                    />

                    <RunnerRating jobId={job._id} />

                    <div className="text-center mt-2 mb-8">
                        <span className="text-xs text-muted-foreground font-medium bg-slate-50 px-3 py-1.5 rounded-full border">
                            Payment confirmed via Visa **** 1234
                        </span>
                    </div>

                </main>

                {/* Fixed Bottom Actions */}
                <div className="fixed bottom-[72px] left-0 right-0 p-6 bg-white/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
                    <div className="max-w-md mx-auto flex flex-col gap-3">
                        <Button asChild className="w-full h-14 text-base font-bold rounded-xl shadow-md">
                            <Link href="/book">Book Another Queue</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full h-14 text-base font-bold rounded-xl border-2 hover:bg-slate-50">
                            <Link href="/dashboard">Back to Home</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
