"use client"

import { useEffect, useState } from "react"
import { EarningsChart } from "@/components/runner/EarningsChart"
import { PayoutList } from "@/components/runner/PayoutList"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface StatsResponse {
    totalEarnings: number
    jobsCompleted: number
    dailyEarnings: { _id: string, total: number }[]
}

export default function RunnerEarningsPage() {
    const [period, setPeriod] = useState<"Today" | "This Week" | "This Month">("This Week")
    const periods: Array<"Today" | "This Week" | "This Month"> = ["Today", "This Week", "This Month"]

    const [stats, setStats] = useState<StatsResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get<StatsResponse>("/api/jobs/runner/stats")
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="min-h-[100dvh] flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    return (
        <div className="flex justify-center bg-slate-50 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative pb-28">

                {/* Header & Hero */}
                <div className="px-6 pt-10 pb-8 bg-white border-b border-slate-100 shadow-sm relative z-10 w-full rounded-b-[2rem]">
                    <h1 className="text-xl font-bold text-slate-900 mb-6 tracking-tight text-center">Earnings</h1>

                    <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                        {periods.map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={cn(
                                    "flex-1 text-xs font-bold py-2.5 rounded-lg transition-all",
                                    period === p ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Total Earnings</span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">R {(stats?.totalEarnings || 0).toFixed(2)}</h2>
                        <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">
                            {stats?.jobsCompleted || 0} Jobs Completed
                        </span>
                    </div>
                </div>

                <main className="flex-1 px-6 py-8 flex flex-col relative z-0 w-full -mt-4">
                    <EarningsChart customData={stats?.dailyEarnings} />
                    <PayoutList />
                </main>

                {/* Action Footer */}
                <div className="fixed bottom-[88px] left-0 right-0 p-6 z-40 pointer-events-none">
                    <div className="max-w-md mx-auto pointer-events-auto">
                        <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-[#80f20d]/20 bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 transition-transform active:scale-95">
                            Request Payout
                        </Button>
                    </div>
                </div>

                <RunnerBottomNav />
            </div>
        </div>
    )
}
