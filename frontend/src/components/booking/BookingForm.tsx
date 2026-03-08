"use client"

import { useState } from "react"
import { TimeSlotPicker } from "./TimeSlotPicker"
import { Button } from "@/components/ui/button"

// Minimal Select UI mock since we lack complex shadcn selects currently installed
function NativeSelect({ label, options }: { label: string, options: string[] }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground px-1">{label}</label>
            <select className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[position:right_12px_center] bg-no-repeat">
                <option value="" disabled selected>Select an option...</option>
                {options.map((opt) => (
                    <option key={opt}>{opt}</option>
                ))}
            </select>
        </div>
    )
}

export function BookingForm() {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Date & Time */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground">When do you need the runner?</h3>
                {/* Mock Horizontal Date Scroll */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
                    {["Today", "Tomorrow", "Wed, 12 Oct", "Thu, 13 Oct"].map((date, i) => (
                        <button key={date} className={`flex-shrink-0 px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${i === 0 ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20" : "bg-white border-slate-200 text-foreground"}`}>
                            {date}
                        </button>
                    ))}
                </div>

                <TimeSlotPicker selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
            </div>

            {/* Docs */}
            <NativeSelect
                label="Which document are you applying for?"
                options={["Smart ID Card", "Passport", "Birth Certificate", "Marriage Certificate", "Death Certificate"]}
            />

            {/* Instructions */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground px-1">Special instructions</label>
                <textarea
                    rows={3}
                    placeholder="e.g. Renewing my passport — I have all my photos ready."
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                ></textarea>
            </div>

            {/* Price & Submit Fixed at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-8 z-50">
                <div className="max-w-md mx-auto flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-muted-foreground">Estimated Total</span>
                    <span className="text-2xl font-bold text-primary">R 150.00</span>
                </div>
                <Button size="lg" className="w-full h-14 text-base font-semibold shadow-md active:scale-[0.98] transition-transform">
                    Confirm & Find Runner
                </Button>
            </div>
        </div>
    )
}
