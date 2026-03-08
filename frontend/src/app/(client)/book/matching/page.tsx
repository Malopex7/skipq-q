"use client"

import { JobSummaryCard } from "@/components/booking/JobSummaryCard"
import { MapPin } from "lucide-react"

export default function MatchingRunnerPage() {
    return (
        <div className="relative w-full h-[100dvh] bg-slate-100 overflow-hidden flex justify-center">
            {/* Mock Map Background Layer */}
            <div className="absolute inset-0 max-w-md mx-auto z-0 overflow-hidden bg-[#e5e9ea] flex items-center justify-center border-x">
                {/* Placeholder for actual map image or integration */}
                <div className="w-full h-full bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-26.0954,27.9996&zoom=14&size=600x1200&maptype=roadmap&markers=color:blue%7C-26.0954,27.9996&style=feature:all|element:labels.text.fill|color:0x7c93a3&style=feature:administrative.country|element:geometry.stroke|color:0xc2d1d6&style=feature:landscape.natural|element:geometry.fill|color:0xe5e9ea&style=feature:poi|element:geometry.fill|color:0xdce4e7&style=feature:road|element:geometry.fill|color:0xffffff&style=feature:road|element:geometry.stroke|color:0xe7ebec&style=feature:water|element:geometry.fill|color:0xbdd6e1')] bg-cover bg-center opacity-70" />

                {/* Pulsing Radar Animation */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative flex items-center justify-center">
                        {/* Ping rings */}
                        <div className="absolute w-48 h-48 bg-primary/20 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute w-32 h-32 bg-primary/30 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>

                        {/* Center Pin */}
                        <div className="relative z-10 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <MapPin className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Status Overlay */}
            <div className="absolute top-12 left-0 right-0 z-10 max-w-md mx-auto px-6">
                <div className="bg-white/90 backdrop-blur shadow-sm border border-white rounded-2xl p-4 flex items-center justify-center gap-3">
                    <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                    <span className="font-bold text-primary text-base">Finding a Runner Near You...</span>
                </div>
            </div>

            {/* Bottom Summary Card */}
            <div className="absolute bottom-0 left-0 right-0 w-full max-w-md mx-auto">
                <JobSummaryCard
                    service="Home Affairs Queue"
                    branch="Randburg Branch"
                    date="Tomorrow, Oct 13"
                    timeSlot="08:00 AM"
                    estimatedPrice="R 150.00"
                />
            </div>
        </div>
    )
}
