import { cn } from "@/lib/utils"

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 py-12 md:py-24", className)}>
      {children}
    </div>
  )
}
