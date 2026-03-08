"use client"

import { useEffect, useState } from "react"
import { MapPin, Users, CheckCircle, Camera, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/lib/api"

const STATUS_FLOW = ["accepted", "en_route", "at_branch", "in_queue", "proceed_to_branch", "complete"]

const JOB_STATES = [
    { backend: "accepted", label: "Runner Accepted", cta: "Start Journey to Location", icon: MapPin },
    { backend: "en_route", label: "En Route to Location", cta: "I've Arrived at the Location", icon: MapPin },
    { backend: "at_branch", label: "Arrived at Location", cta: "I'm Now Waiting in the Queue", icon: Users },
    { backend: "in_queue", label: "Waiting in Queue", cta: "I'm Near the Front", icon: Users },
    { backend: "proceed_to_branch", label: "Near the Front", cta: "Queue Complete", icon: CheckCircle },
    { backend: "complete", label: "Job Completed", cta: "Upload Proof", icon: CheckCircle }
]

interface Job {
    _id: string
    serviceType: string
    status: string
    clientId?: { name: string }
}

export function StatusUpdatePanel() {
    const params = useParams()
    const router = useRouter()
    const jobId = params.id as string

    const [job, setJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (!jobId) return
        api.get<Job>(`/api/jobs/${jobId}`)
            .then(setJob)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [jobId])

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    if (!job) {
        return <div className="text-center p-8">Job not found</div>
    }

    const currentFlowIndex = Math.max(0, STATUS_FLOW.indexOf(job.status))
    const isFinished = currentFlowIndex >= STATUS_FLOW.length - 1
    const currentJobState = JOB_STATES[currentFlowIndex]
    const CurrentIcon = currentJobState.icon

    const handleNextState = async () => {
        if (updating || isFinished) return
        const nextStatus = STATUS_FLOW[currentFlowIndex + 1]

        try {
            setUpdating(true)
            const updated = await api.patch<Job>(`/api/jobs/${jobId}/status`, { status: nextStatus })
            setJob(updated)

            if (nextStatus === "complete") {
                // If complete, runner could be redirected to earnings or job history
                router.push("/jobs")
            }
        } catch (err) {
            console.error(err)
            alert("Failed to update status")
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto pt-4 pb-32">

            {/* Job Header Info integrated from page */}
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-3xl w-full mb-6 border shadow-sm">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 bg-primary/10 px-3 py-1 rounded-full">Active Job</span>
                <h1 className="text-xl font-black text-slate-900 tracking-tight text-center">{job.serviceType}</h1>
                <p className="text-sm font-semibold text-slate-500 mt-1">Client: {job.clientId?.name || "Pending"}</p>
            </div>

            {/* Current Status Card */}
            <div className="bg-white border text-center border-slate-200 shadow-sm rounded-[2rem] p-8 w-full mb-12">
                <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 shadow-inner">
                    {isFinished ? (
                        <CheckCircle className="h-10 w-10 text-[#80f20d]" />
                    ) : (
                        <CurrentIcon className="h-10 w-10 text-slate-800" />
                    )}
                </div>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Current Status</h2>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {currentJobState.label}
                </h3>
            </div>

            {/* Main CTA */}
            {!isFinished && (
                <Button
                    onClick={handleNextState}
                    disabled={updating}
                    className="w-full h-16 text-xl font-black rounded-2xl shadow-lg shadow-[#80f20d]/20 bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 transition-transform active:scale-95 mb-4"
                >
                    {updating ? <Loader2 className="h-6 w-6 animate-spin" /> : currentJobState.cta}
                </Button>
            )}

            {/* Secondary Actions */}
            {isFinished ? (
                <Button variant="outline" className="w-full h-16 text-lg font-bold rounded-2xl border-slate-200 text-slate-700 bg-white">
                    <Camera className="mr-2 h-5 w-5" />
                    Upload Proof of Completion
                </Button>
            ) : (
                <Button variant="outline" className="w-full h-16 text-lg font-bold rounded-2xl border-transparent bg-slate-900 text-white hover:bg-slate-800 hover:text-white">
                    Chat with Client
                </Button>
            )}

        </div>
    )
}
