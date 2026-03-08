import { cn } from "@/lib/utils"

export interface Message {
    id: string;
    text: string;
    timestamp: string;
    isClient: boolean;
}

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    return (
        <div className={cn(
            "flex w-full mb-4",
            message.isClient ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "max-w-[75%] px-4 py-2.5 flex flex-col gap-1",
                message.isClient
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                    : "bg-white border text-foreground rounded-2xl rounded-tl-sm shadow-sm"
            )}>
                <p className="text-[15px] leading-relaxed break-words">{message.text}</p>
                <span className={cn(
                    "text-[10px] self-end font-medium",
                    message.isClient ? "text-primary-foreground/70" : "text-slate-400"
                )}>
                    {message.timestamp}
                </span>
            </div>
        </div>
    )
}
