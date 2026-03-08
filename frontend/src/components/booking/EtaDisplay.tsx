interface EtaDisplayProps {
    minutes: number;
    timeRange?: string;
}

export function EtaDisplay({ minutes, timeRange }: EtaDisplayProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border text-center my-6">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                ETA to Front
            </span>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-foreground">
                    {minutes}
                </span>
                <span className="text-xl font-bold text-slate-500">mins</span>
            </div>
            {timeRange && (
                <span className="text-sm font-medium text-slate-500 mt-2">
                    Expected between {timeRange}
                </span>
            )}
        </div>
    )
}
