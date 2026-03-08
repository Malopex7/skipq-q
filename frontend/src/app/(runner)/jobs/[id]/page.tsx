"use client"

import { useEffect, useState } from "react"
import { JobDetailCard } from "@/components/runner/JobDetailCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface Job {
    _id: string
    serviceType: string
    branchName: string
    address: string
    scheduledTime: string
    payAmount: number
    instructions?: string
    status: string
}

export default function RunnerJobDetailPage() {
    const params = useParams()
    const router = useRouter()
    const jobId = params.id as string

    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [accepting, setAccepting] = useState(false)

    useEffect(() => {
        if (!jobId) return
        api.get<Job>(`/api/jobs/${jobId}`)
            .then(setJob)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [jobId])

    const handleAccept = async () => {
        try {
            setAccepting(true)
            await api.post(`/api/jobs/${jobId}/accept`, {})
            router.push(`/jobs/${jobId}/active`)
        } catch (err) {
            console.error(err)
            alert("Failed to accept job. It may no longer be available.")
            setAccepting(false)
            router.push("/jobs")
        }
    }

    if (loading) {
        return <div className="min-h-[100dvh] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    if (!job) {
        return <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 gap-4"><p>Job not found</p><Button asChild><Link href="/jobs">Back to Jobs</Link></Button></div>
    }

    // Format date string safely without date-fns
    let formattedDate = "Today"
    try {
        if (job.scheduledTime) {
            const date = new Date(job.scheduledTime)
            formattedDate = date.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            })
        }
    } catch { }

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative">

                {/* Map Header Preview (Placeholder) */}
                <div className="h-64 w-full bg-slate-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                        alt="Map Preview"
                        className="w-full h-full object-cover opacity-80"
                    />
                    {/* Map Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="h-10 w-10 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <div className="h-3 w-3 bg-white rounded-full" />
                        </div>
                    </div>
                    <div className="absolute top-4 left-4">
                        <Button variant="secondary" size="icon" asChild className="rounded-full shadow-md bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 h-10 w-10">
                            <Link href="/jobs">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </Link>
                        </Button>
                    </div>
                </div>

                <main className="flex-1 px-4 -mt-8 relative z-10 w-full mb-8">
                    <JobDetailCard
                        serviceName={job.serviceType}
                        branchName={job.branchName}
                        address={job.address || job.branchName}
                        scheduledTime={formattedDate}
                        duration="2-3 Hours"
                        documentsNeeded="Standard Client ID docs"
                        instructions={job.instructions || "Please ensure you arrive on time."}
                        payAmount={`R ${job.payAmount.toFixed(2)}`}
                    />
                </main>

                {/* Action Footer */}
                {job.status === "pending" ? (
                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
                        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
                            <Button
                                onClick={handleAccept}
                                disabled={accepting}
                                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-[#80f20d]/20 bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 transition-transform active:scale-95">
                                {accepting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Accept Job"}
                            </Button>
                            <Link href="/jobs" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                                Decline & Go Back
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
                        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
                            <div className="w-full text-center p-3 text-sm font-semibold text-slate-500 bg-slate-100 rounded-xl">
                                This job is no longer available.
                            </div>
                            <Button variant="outline" asChild className="w-full h-14">
                                <Link href="/jobs">Return to Jobs</Link>
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
