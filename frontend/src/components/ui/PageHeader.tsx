import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backHref?: string;
    className?: string;
}

export function PageHeader({ title, subtitle, backHref = "/", className }: PageHeaderProps) {
    return (
        <div className={cn("pt-6 pb-4 px-6 bg-background sticky top-0 z-10 border-b", className)}>
            <div className="flex items-center gap-4 mb-4">
                {backHref && (
                    <Link
                        href={backHref}
                        className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                )}
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
        </div>
    )
}
