import { Check } from "lucide-react"

interface CompletionHeaderProps {
    title?: string;
}

export function CompletionHeader({ title = "Queue Complete!" }: CompletionHeaderProps) {
    return (
        <div className="flex flex-col items-center justify-center mt-12 mb-8">
            <div className="h-24 w-24 bg-[#80f20d] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#80f20d]/20 relative">
                {/* Pulse effect rings */}
                <div className="absolute inset-0 rounded-full border-4 border-[#80f20d]/30 scale-110 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 rounded-full border-4 border-[#80f20d]/20 scale-125 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

                <Check className="h-12 w-12 text-white stroke-[3] relative z-10" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight text-center">
                {title}
            </h1>
        </div>
    )
}
