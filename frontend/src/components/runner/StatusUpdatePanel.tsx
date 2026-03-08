"use client"

import { useState } from "react"
import { MapPin, Users, CheckCircle, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

const JOB_STATES = [
    { id: "arriving", label: "Arriving at Location", cta: "I've Arrived at the Location", icon: MapPin },
    { id: "waiting", label: "Waiting in Queue", cta: "I'm Now Waiting in the Queue", icon: Users },
    { id: "near_front", label: "Near the Front", cta: "I'm Near the Front", icon: CheckCircle },
    { id: "completed", label: "Queue Finished", cta: "Task Complete", icon: CheckCircle }
]

export function StatusUpdatePanel() {
    const [currentStateIndex, setCurrentStateIndex] = useState(0)
    const isFinished = currentStateIndex >= JOB_STATES.length

    const currentJobState = JOB_STATES[Math.min(currentStateIndex, JOB_STATES.length - 1)]
    const CurrentIcon = currentJobState.icon

    const handleNextState = () => {
        setCurrentStateIndex(prev => prev + 1)
    }

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto pt-8 pb-32">

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
                    {isFinished ? "Job Completed" : currentJobState.label}
                </h3>
            </div>

            {/* Main CTA */}
            {!isFinished && (
                <Button
                    onClick={handleNextState}
                    className="w-full h-16 text-xl font-black rounded-2xl shadow-lg shadow-[#80f20d]/20 bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 transition-transform active:scale-95 mb-4"
                >
                    {currentJobState.cta}
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
