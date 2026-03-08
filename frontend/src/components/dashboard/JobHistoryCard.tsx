import { ChevronRight } from "lucide-react"
import Link from "next/link"

export interface JobHistoryCardProps {
    id: string;
    serviceName: string;
    branchName: string;
    date: string;
    price: string;
    status: "completed" | "cancelled";
}

export function JobHistoryCard({ id, serviceName, branchName, date, price, status }: JobHistoryCardProps) {
    return (
        <Link href={`/jobs/${id}`} className="block group">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">

                <div className="flex flex-col gap-1.5 flex-1 pr-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground text-base tracking-tight">{serviceName}</h3>
                        <span className="font-semibold text-foreground text-sm">{price}</span>
                    </div>

                    <p className="text-sm text-muted-foreground truncate">{branchName}</p>

                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-medium text-slate-400">{date}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${status === "completed" ? "bg-slate-100 text-slate-600" : "bg-red-50 text-red-600"
                            }`}>
                            {status}
                        </span>
                    </div>
                </div>

                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors shrink-0">
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
                </div>

            </div>
        </Link>
    )
}
