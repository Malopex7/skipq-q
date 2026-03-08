"use client"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { ActiveJobBanner } from "@/components/dashboard/ActiveJobBanner"
import { JobHistoryCard } from "@/components/dashboard/JobHistoryCard"
import { ClientBottomNav } from "@/components/dashboard/ClientBottomNav"
import { Plus } from "lucide-react"
import Link from "next/link"

const RECENT_JOBS = [
    { id: "101", serviceName: "Home Affairs Queue", branchName: "Randburg Branch", date: "Oct 12, 2023", price: "R 150.00", status: "completed" as const },
    { id: "102", serviceName: "General Permit Inquiry", branchName: "Edenvale Branch", date: "Sep 28, 2023", price: "R 200.00", status: "completed" as const },
    { id: "103", serviceName: "Passport Renewal", branchName: "Sandton Branch", date: "Aug 15, 2023", price: "R 150.00", status: "cancelled" as const },
]

export default function ClientDashboardPage() {
    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative pb-28">

                <DashboardHeader userName="Thabo" avatarUrl="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&h=150&fit=crop&q=80" />

                <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-8">

                    <section>
                        <ActiveJobBanner
                            runnerName="Sipho"
                            branchName="Randomise Home Affairs"
                            status="Waiting in Queue"
                        />
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
                            <Link href="/jobs" className="text-sm font-semibold text-primary hover:underline">
                                View All
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            {RECENT_JOBS.map(job => (
                                <JobHistoryCard key={job.id} {...job} />
                            ))}
                        </div>
                    </section>

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
