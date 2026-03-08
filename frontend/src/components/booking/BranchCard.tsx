import { StatusBadge } from "@/components/ui/StatusBadge"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface BranchCardProps {
    name: string;
    area: string;
    distance: string;
    waitTime: string;
    urgency: "low" | "moderate" | "high";
    onSelect?: () => void;
}

export function BranchCard({ name, area, distance, waitTime, urgency, onSelect }: BranchCardProps) {
    return (
        <div className="flex flex-col p-5 bg-background border rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-base text-foreground mb-1">{name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {area} <span className="mx-2">•</span> {distance}
                    </div>
                </div>
                <StatusBadge urgency={urgency} text={waitTime} />
            </div>

            <Button
                onClick={onSelect}
                variant="outline"
                className="w-full justify-between active:bg-slate-100 bg-slate-50 border-slate-200"
            >
                <span>Select this branch</span>
                <span className="text-primary font-bold">→</span>
            </Button>
        </div>
    )
}
