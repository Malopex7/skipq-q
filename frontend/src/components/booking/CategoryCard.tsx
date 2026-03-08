import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Check } from "lucide-react"

interface CategoryCardProps {
    name: string;
    icon: LucideIcon;
    waitTime: string;
    isSelected?: boolean;
    onClick?: () => void;
}

export function CategoryCard({ name, icon: Icon, waitTime, isSelected, onClick }: CategoryCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center justify-center p-6 text-center rounded-2xl border transition-all duration-200 bg-background hover:bg-slate-50",
                isSelected
                    ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5 hover:bg-primary/5"
                    : "border-slate-200"
            )}
        >
            {isSelected && (
                <div className="absolute top-3 right-3 h-5 w-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                </div>
            )}

            <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}>
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="font-semibold text-sm mb-1 text-foreground leading-tight">{name}</h3>
            <p className="text-xs text-muted-foreground font-medium">{waitTime}</p>
        </button>
    )
}
