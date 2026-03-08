"use client"

import { OnboardingProgress } from "@/components/runner/OnboardingProgress"
import { RunnerInputForm } from "@/components/runner/RunnerInputForm"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RunnerOnboardingStep1Page() {
    return (
        <div className="flex justify-center bg-slate-50 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative">

                {/* Header Link */}
                <div className="pt-8 px-6 pb-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-foreground tracking-tight">Runner Setup</span>
                    <Link href="/" className="text-sm font-semibold text-primary hover:underline">
                        Back to Login
                    </Link>
                </div>

                <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col pb-32">

                    <OnboardingProgress currentStep={1} />

                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-8">
                        Personal Details
                    </h1>

                    <RunnerInputForm />

                </main>

                {/* Sticky Bottom Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-50 border-t border-slate-200/60 z-50">
                    <div className="max-w-md mx-auto">
                        <Button asChild className="w-full h-14 text-lg font-bold rounded-xl shadow-md">
                            <Link href="/onboard/step2">Next Step</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}
