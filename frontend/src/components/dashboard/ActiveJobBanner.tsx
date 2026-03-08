import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ActiveJobBannerProps {
    jobId: string;
    runnerName: string;
    branchName: string;
    status: string;
}

export function ActiveJobBanner({ jobId, runnerName, branchName, status }: ActiveJobBannerProps) {
    return (
        <div className="bg-primary rounded-3xl p-6 text-primary-foreground shadow-lg relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        Active Booking
                    </span>
                    <span className="text-sm font-medium text-white/90">
                        {status}
                    </span>
                </div>

                <h2 className="text-xl font-bold mb-1">{runnerName} is at</h2>
                <div className="flex items-center gap-1.5 text-white/90 mb-6">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium text-[15px]">{branchName}</span>
                </div>

                <Link
                    href={`/jobs/${jobId}/tracker`}
                    className="flex items-center justify-center w-full bg-[#80f20d] hover:bg-[#72db0c] text-slate-900 font-bold py-3.5 rounded-xl transition-colors shadow-sm"
                >
                    Track Live
                    <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
            </div>
        </div>
    )
}
