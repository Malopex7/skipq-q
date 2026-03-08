import { MapPin, Calendar, CreditCard } from "lucide-react"

interface JobSummaryCardProps {
    service: string;
    branch: string;
    date: string;
    timeSlot: string;
    estimatedPrice: string;
}

export function JobSummaryCard({ service, branch, date, timeSlot, estimatedPrice }: JobSummaryCardProps) {
    return (
        <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] w-full p-6 pb-8 absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-5">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />

            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Job Summary</h3>
                <p className="text-xl font-bold text-foreground leading-tight">{service}</p>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{branch}</span>
                        <span className="text-xs text-muted-foreground">Location</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{date}, {timeSlot}</span>
                        <span className="text-xs text-muted-foreground">Arrival</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{estimatedPrice}</span>
                        <span className="text-xs text-muted-foreground">Est. Total</span>
                    </div>
                </div>
            </div>

            <button className="w-full mt-4 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
                Cancel Request
            </button>
        </div>
    )
}
