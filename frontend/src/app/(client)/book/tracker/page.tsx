"use client"

import { PageHeader } from "@/components/ui/PageHeader"
import { RunnerProfileCard } from "@/components/booking/RunnerProfileCard"
import { EtaDisplay } from "@/components/booking/EtaDisplay"
import { QueueProgressTracker, QueueStep } from "@/components/booking/QueueProgressTracker"
import { Button } from "@/components/ui/button"
import { FileEdit } from "lucide-react"

// Mock Data
const TRACKER_STEPS: QueueStep[] = [
    { id: "accepted", label: "Runner Accepted", status: "complete", time: "07:45 AM" },
    { id: "enroute", label: "En Route to Branch", status: "complete", time: "07:50 AM" },
    { id: "arrived", label: "Arrived at Branch", status: "complete", time: "08:12 AM" },
    { id: "waiting", label: "Waiting in Queue", status: "current" },
    { id: "nearfront", label: "Near the Front (You proceed)", status: "pending" },
    { id: "complete", label: "Service Complete", status: "pending" },
]

export default function LiveQueueTrackerPage() {
    return (
        <div className="min-h-[100dvh] bg-slate-50 flex justify-center pb-8">
            <div className="w-full max-w-md bg-white border-x min-h-[100dvh]">
                <PageHeader
                    title="Live Queue Tracker"
                    backHref="/book/matching"
                />

                <main className="px-6 py-6 pb-24">
                    <RunnerProfileCard
                        name="Sipho M."
                        rating={4.9}
                    />

                    <EtaDisplay
                        minutes={45}
                        timeRange="09:15 - 09:30 AM"
                    />

                    <div className="mt-8 mb-4">
                        <h3 className="text-lg font-bold text-foreground mb-4">Queue Progress</h3>
                        <div className="bg-slate-50 p-5 rounded-2xl border">
                            <QueueProgressTracker steps={TRACKER_STEPS} />
                        </div>
                    </div>

                </main>

                {/* Fixed Bottom Action */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
                    <div className="max-w-md mx-auto">
                        <Button variant="outline" className="w-full h-14 text-base font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-transform">
                            <FileEdit className="mr-2 h-5 w-5" />
                            Update Instructions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
