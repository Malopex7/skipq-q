import { ClientBottomNav } from "@/components/dashboard/ClientBottomNav"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-[100dvh]">
            {children}
            <ClientBottomNav />
        </div>
    )
}
