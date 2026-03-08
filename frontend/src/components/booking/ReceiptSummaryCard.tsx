interface ReceiptSummaryCardProps {
    branchName: string;
    runnerName: string;
    duration: string;
    totalCost: string;
}

export function ReceiptSummaryCard({ branchName, runnerName, duration, totalCost }: ReceiptSummaryCardProps) {
    return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 w-full shadow-sm mb-8">
            <div className="flex flex-col gap-4">

                <div className="flex justify-between items-start pb-4 border-b border-slate-200/60">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location</span>
                        <span className="font-semibold text-base text-foreground">{branchName}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
                    <span className="text-sm font-medium text-muted-foreground">Runner</span>
                    <span className="font-semibold text-foreground">{runnerName}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
                    <span className="text-sm font-medium text-muted-foreground">Duration</span>
                    <span className="font-semibold text-foreground">{duration}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-foreground">Total Cost</span>
                    <span className="text-2xl font-black text-primary">{totalCost}</span>
                </div>

            </div>
        </div>
    )
}
