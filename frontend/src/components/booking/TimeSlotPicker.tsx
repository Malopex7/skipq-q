"use client"

import { cn } from "@/lib/utils"

interface TimeSlotPickerProps {
    selectedSlot: string | null;
    onSelect: (slot: string) => void;
}

const SLOTS = [
    { id: "morning", label: "Morning", sublabel: "08:00 - 12:00" },
    { id: "afternoon", label: "Afternoon", sublabel: "12:00 - 16:00" },
    { id: "specific", label: "Specific Time", sublabel: "Choose exact slot" },
]

export function TimeSlotPicker({ selectedSlot, onSelect }: TimeSlotPickerProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                    <button
                        key={slot.id}
                        type="button"
                        onClick={() => onSelect(slot.id)}
                        className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center",
                            isSelected
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-background border-slate-200 text-foreground hover:bg-slate-50"
                        )}
                    >
                        <span className="font-semibold text-sm mb-1">{slot.label}</span>
                        <span className={cn(
                            "text-xs font-medium",
                            isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                            {slot.sublabel}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
