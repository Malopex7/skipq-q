"use client"

import { MapPin, Clock, Timer, ArrowRight } from "lucide-react"
import Link from "next/link"

export interface JobFeedCardProps {
    id: string;
    serviceName: string;
    branchName: string;
    distance: string;
    scheduledTime: string;
    duration: string;
    payAmount: string;
}

export function JobFeedCard({
    id,
    serviceName,
    branchName,
    distance,
    scheduledTime,
    duration,
    payAmount
}: JobFeedCardProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-white mb-1 tracking-tight">{serviceName}</h3>
                    <p className="text-sm font-medium text-slate-400">{branchName}</p>
                </div>
                <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                    <span className="text-xl font-bold text-[#80f20d] tracking-tight">{payAmount}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 p-2.5 rounded-lg">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-sm font-semibold">{distance}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 p-2.5 rounded-lg">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-sm font-semibold">{scheduledTime}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 p-2.5 rounded-lg col-span-2">
                    <Timer className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-sm font-semibold">Est. {duration}</span>
                </div>
            </div>

            <Link
                href={`/jobs/${id}/accept`}
                className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
                View Details
                <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
        </div>
    )
}
