import { Building2, MapPin, Clock, Timer, FileText, Download } from "lucide-react"

interface JobDetailCardProps {
    serviceName: string;
    branchName: string;
    address: string;
    scheduledTime: string;
    duration: string;
    documentsNeeded: string;
    instructions: string;
    payAmount: string;
}

export function JobDetailCard({
    serviceName,
    branchName,
    address,
    scheduledTime,
    duration,
    documentsNeeded,
    instructions,
    payAmount
}: JobDetailCardProps) {
    return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 flex flex-col gap-6 relative z-10 w-full mb-32">

            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                    <Building2 className="h-7 w-7 text-primary" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-foreground tracking-tight">{serviceName}</h1>
                    <p className="text-sm font-semibold text-muted-foreground mt-0.5">{branchName}</p>
                </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
                <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-600 leading-relaxed">{address}</p>
            </div>

            <hr className="border-slate-100" />

            {/* Grid Specs */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Scheduled</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{scheduledTime}</p>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Timer className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Est. Duration</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{duration}</p>
                </div>

                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Documents Needed</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <Download className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm font-semibold text-primary">{documentsNeeded}</span>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100">
                <h3 className="text-xs font-bold text-orange-800 uppercase tracking-widest mb-2">Special Instructions</h3>
                <p className="text-sm text-orange-900 leading-relaxed font-medium">&quot;{instructions}&quot;</p>
            </div>

            {/* Earnings */}
            <div className="flex items-center justify-between bg-slate-900 rounded-2xl p-5 mt-2">
                <span className="text-white font-bold text-lg">You Earn</span>
                <span className="text-2xl font-black text-[#80f20d] tracking-tight">{payAmount}</span>
            </div>

        </div>
    )
}
