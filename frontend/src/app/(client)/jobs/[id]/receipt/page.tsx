"use client"

import { CompletionHeader } from "@/components/booking/CompletionHeader"
import { ReceiptSummaryCard } from "@/components/booking/ReceiptSummaryCard"
import { RunnerRating } from "@/components/booking/RunnerRating"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReceiptPage() {
    return (
        <div className="flex justify-center bg-white min-h-[100dvh]">
            <div className="w-full max-w-md border-x min-h-[100dvh] flex flex-col relative">
                <main className="flex-1 overflow-y-auto px-6 pb-32">

                    <CompletionHeader />

                    <ReceiptSummaryCard
                        branchName="Home Affairs - Randburg"
                        runnerName="Sipho M."
                        duration="3h 15m"
                        totalCost="R 150.00"
                    />

                    <RunnerRating />

                    <div className="text-center mt-2 mb-8">
                        <span className="text-xs text-muted-foreground font-medium bg-slate-50 px-3 py-1.5 rounded-full border">
                            Payment confirmed via Visa **** 1234
                        </span>
                    </div>

                </main>

                {/* Fixed Bottom Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-sm border-t shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
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
