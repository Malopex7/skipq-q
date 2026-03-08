"use client"

import { useState } from "react"
import { Star, MapPin, LogOut, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"

const SERVICE_AREAS = ["Randburg", "Sandton", "Midrand", "Roodepoort"]

export default function RunnerProfilePage() {
    const [isOnline, setIsOnline] = useState(true)

    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-white min-h-[100dvh] flex flex-col pb-24">

                {/* Header */}
                <div className="bg-slate-900 pt-14 pb-8 px-6 text-center relative">
                    <div className="mx-auto h-24 w-24 rounded-full bg-[#80f20d] flex items-center justify-center text-slate-900 font-black text-4xl border-4 border-white shadow-lg mb-3">
                        S
                    </div>
                    <h1 className="text-xl font-black text-white">Sipho Khumalo</h1>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-[#80f20d] fill-[#80f20d]" />
                        <span className="text-sm font-semibold text-white/90">4.9 Rating</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200 bg-white">
                    {[
                        { label: "Jobs Done", value: "248" },
                        { label: "This Month", value: "R 4,200" },
                        { label: "Rating", value: "4.9 ★" },
                    ].map(stat => (
                        <div key={stat.label} className="py-4 flex flex-col items-center gap-0.5">
                            <span className="text-lg font-black text-slate-900">{stat.value}</span>
                            <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Online Toggle */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-base font-bold text-slate-900">Available for Work</p>
                        <p className="text-xs text-slate-500 font-medium">You are currently <span className={isOnline ? "text-green-600" : "text-slate-400"}>{isOnline ? "online" : "offline"}</span></p>
                    </div>
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${isOnline ? "bg-[#80f20d]" : "bg-slate-300"}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${isOnline ? "translate-x-8" : "translate-x-1"}`} />
                    </button>
                </div>

                {/* Profile Fields */}
                <div className="px-6 py-5 space-y-4 border-b border-slate-100">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                        <p className="text-base font-semibold text-slate-900 mt-1">Sipho Khumalo</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                        <p className="text-base font-semibold text-slate-900 mt-1">+27 82 123 4567</p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service Areas</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {SERVICE_AREAS.map(area => (
                                <div key={area} className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    <MapPin className="h-3 w-3 text-slate-500" />
                                    {area}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-5 space-y-3">
                    <Button className="w-full h-12 font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full h-12 font-bold text-red-600 border-red-200 hover:bg-red-50 rounded-xl">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                    </Button>
                </div>

                <RunnerBottomNav active="profile" />
            </div>
        </div>
    )
}
