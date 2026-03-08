import { Building2, MapPin } from "lucide-react"

interface BookingSummaryCardProps {
    serviceName: string;
    branchName: string;
}

export function BookingSummaryCard({ serviceName, branchName }: BookingSummaryCardProps) {
    return (
        <div className="bg-slate-50 border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Building2 className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Service</p>
                    <p className="font-semibold text-foreground text-sm leading-tight">{serviceName}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200/50 text-slate-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Location</p>
                    <p className="font-semibold text-foreground text-sm leading-tight">{branchName}</p>
                </div>
            </div>
        </div>
    )
}
