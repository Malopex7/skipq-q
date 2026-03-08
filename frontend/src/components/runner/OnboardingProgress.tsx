import { cn } from "@/lib/utils"

interface OnboardingProgressProps {
    currentStep: number;
    totalSteps?: number;
}

export function OnboardingProgress({ currentStep, totalSteps = 5 }: OnboardingProgressProps) {
    return (
        <div className="w-full mb-8">
            <div className="flex gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const stepNumber = index + 1
                    const isActive = stepNumber <= currentStep

                    return (
                        <div
                            key={stepNumber}
                            className={cn(
                                "flex-1 h-2 rounded-full transition-colors duration-300",
                                isActive ? "bg-primary" : "bg-slate-200"
                            )}
                        />
                    )
                })}
            </div>
            <p className="text-xs font-semibold text-muted-foreground mt-3 uppercase tracking-wider text-right">
                Step {currentStep} of {totalSteps}
            </p>
        </div>
    )
}
