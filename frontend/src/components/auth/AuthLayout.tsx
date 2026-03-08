import { cn } from "@/lib/utils"

export function AuthLayout({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6", className)}>
            <div className="w-full max-w-md space-y-8">
                {/* App Logo & Tagline */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">SkipQ</h1>
                    <p className="text-sm font-medium text-muted-foreground mt-2">
                        Skip the Queue. Send a Runner.
                    </p>
                </div>

                {/* Auth Content */}
                {children}
            </div>
        </div>
    )
}
