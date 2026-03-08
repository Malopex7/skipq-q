import { cn } from "@/lib/utils"

type Urgency = "low" | "moderate" | "high"

interface StatusBadgeProps {
    urgency: Urgency;
    text: string;
    className?: string;
}

const URGENCIES = {
    low: "bg-green-100 text-green-700 ring-green-600/20",
    moderate: "bg-orange-100 text-orange-700 ring-orange-600/20",
    high: "bg-red-100 text-red-700 ring-red-600/20"
}

export function StatusBadge({ urgency, text, className }: StatusBadgeProps) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
            URGENCIES[urgency],
            className
        )}>
            {text}
        </span>
    )
}
