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
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1 tracking-tight">{serviceName}</h3>
                    <p className="text-sm font-medium text-slate-500">{branchName}</p>
                </div>
                <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <span className="text-xl font-bold text-green-600 tracking-tight">{payAmount}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-sm font-semibold">{distance}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="text-sm font-semibold">{scheduledTime}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg col-span-2 border border-slate-100">
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
