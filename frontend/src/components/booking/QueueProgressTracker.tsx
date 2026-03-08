"use client"

import { cn } from "@/lib/utils"
import { Check, Loader2 } from "lucide-react"

export type QueueStepStatus = "complete" | "current" | "pending"

export interface QueueStep {
    id: string;
    label: string;
    status: QueueStepStatus;
    time?: string;
}

interface QueueProgressTrackerProps {
    steps: QueueStep[];
}

export function QueueProgressTracker({ steps }: QueueProgressTrackerProps) {
    return (
        <div className="flex flex-col relative py-4">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isComplete = step.status === "complete";
                const isCurrent = step.status === "current";

                return (
                    <div key={step.id} className="flex gap-4 relative min-h-[4rem]">
                        {/* Tracking Line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "absolute left-[11px] top-7 bottom-[-0.5rem] w-0.5",
                                    isComplete ? "bg-[#80f20d]" : "bg-slate-200"
                                )}
                            />
                        )}

                        {/* Step Icon */}
                        <div className="relative z-10 mt-1 shrink-0">
                            <div
                                className={cn(
                                    "h-[24px] w-[24px] rounded-full flex items-center justify-center text-white border-2",
                                    isComplete ? "bg-[#80f20d] border-[#80f20d]" :
                                        isCurrent ? "bg-white border-[#80f20d] ring-4 ring-[#80f20d]/20" :
                                            "bg-white border-slate-300"
                                )}
                            >
                                {isComplete && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                                {isCurrent && <div className="h-2.5 w-2.5 bg-[#80f20d] rounded-full animate-pulse" />}
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className={cn(
                            "flex flex-col pb-6 pt-1 flex-1",
                            isCurrent ? "opacity-100" : "opacity-80"
                        )}>
                            <div className="flex justify-between items-start">
                                <span className={cn(
                                    "text-base",
                                    isCurrent ? "font-bold text-foreground" :
                                        isComplete ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                                )}>
                                    {step.label}
                                </span>
                                {step.time && (
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        {step.time}
                                    </span>
                                )}
                            </div>

                            {isCurrent && (
                                <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-[#70d60b]">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    Updating live...
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
