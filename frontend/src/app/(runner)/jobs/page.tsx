"use client"

import { OnlineToggle } from "@/components/runner/OnlineToggle"
import { JobFeedCard } from "@/components/runner/JobFeedCard"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"

const AVAILABLE_JOBS = [
    {
        id: "j-101",
        serviceName: "Home Affairs Renewal",
        branchName: "Randburg Branch",
        distance: "2.5 km away",
        scheduledTime: "08:30 AM Today",
        duration: "3 hours",
        payAmount: "R 120"
    },
    {
        id: "j-102",
        serviceName: "Vehicle Licensing",
        branchName: "Sandton Traffic Dept",
        distance: "5.1 km away",
        scheduledTime: "11:00 AM Today",
        duration: "2.5 hours",
        payAmount: "R 95"
    },
    {
        id: "j-103",
        serviceName: "Passport Collection",
        branchName: "Edenvale Branch",
        distance: "8.0 km away",
        scheduledTime: "02:15 PM Today",
        duration: "1.5 hours",
        payAmount: "R 80"
    }
]

export default function RunnerDashboardPage() {
    return (
        <div className="flex justify-center bg-black min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-950 border-x border-slate-900 min-h-[100dvh] flex flex-col relative pb-28">

                {/* Header */}
                <div className="px-6 pt-10 pb-6 bg-slate-950 sticky top-0 z-20 border-b border-slate-900 shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">Available Jobs</h1>
                            <p className="text-sm text-slate-400 font-medium">Near Johannesburg</p>
                        </div>
                        <OnlineToggle />
                    </div>

                    <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl">
                        <span className="text-sm font-medium text-slate-400">Today&apos;s Earnings:</span>
                        <span className="font-bold text-white">R 450.00</span>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-6 py-4">
                    <button className="whitespace-nowrap bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-full shadow-sm">
                        All Services
                    </button>
                    <button className="whitespace-nowrap bg-slate-900 text-slate-300 font-semibold text-xs px-4 py-2 rounded-full border border-slate-800">
                        &lt; 5km
                    </button>
                    <button className="whitespace-nowrap bg-slate-900 text-slate-300 font-semibold text-xs px-4 py-2 rounded-full border border-slate-800">
                        Morning Only
                    </button>
                </div>

                {/* Feed */}
                <main className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-4">
                    {AVAILABLE_JOBS.map(job => (
                        <JobFeedCard key={job.id} {...job} />
                    ))}
                </main>

                <RunnerBottomNav />
            </div>
        </div>
    )
}
