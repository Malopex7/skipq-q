import { cn } from "@/lib/utils"

export function SurfaceCard({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border bg-background p-6 shadow-sm",
                className
            )}
        >
            {children}
        </div>
    )
}
