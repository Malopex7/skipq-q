"use client"

import { JobDetailCard } from "@/components/runner/JobDetailCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RunnerJobDetailPage() {
    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative">

                {/* Map Header Preview (Placeholder) */}
                <div className="h-64 w-full bg-slate-200 relative">
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
                        serviceName="Smart ID & Passport"
                        branchName="Randburg Home Affairs"
                        address="110 Malibongwe Dr, Randburg, 2194"
                        scheduledTime="Today, 08:30 AM"
                        duration="3h 15m"
                        documentsNeeded="Client Application Form PDF"
                        instructions="Please bring a portable charger, the queue is outside and quite long today."
                        payAmount="R 160.00"
                    />
                </main>

                {/* Action Footer */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
                    <div className="max-w-md mx-auto flex flex-col items-center gap-4">
                        <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-[#80f20d]/20 bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 transition-transform active:scale-95">
                            Accept Job
                        </Button>
                        <Link href="/jobs" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                            Decline & Go Back
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
