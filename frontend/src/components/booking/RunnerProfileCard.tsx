import { Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RunnerProfileCardProps {
    name: string;
    rating: number;
    imageUrl?: string;
    onChatClick?: () => void;
}

export function RunnerProfileCard({ name, rating, imageUrl, onChatClick }: RunnerProfileCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-14 w-14 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-slate-100 flex items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-xl font-bold text-slate-400">{name.charAt(0)}</span>
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Your Runner</span>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="text-sm font-medium text-slate-600">{rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <Button
                onClick={onChatClick}
                className="h-11 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-xl"
            >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
            </Button>
        </div>
    )
}
