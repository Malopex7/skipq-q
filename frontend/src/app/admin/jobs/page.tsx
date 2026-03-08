import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { LiveJobsMonitor } from "@/components/admin/LiveJobsMonitor"
import { RefreshCw } from "lucide-react"

export default function AdminJobsPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-lg font-bold text-slate-900">Live Job Monitoring</h1>
                        <p className="text-xs font-medium text-slate-500">Real-time view of all active platform jobs.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Auto-refreshing in 30s
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <LiveJobsMonitor />
                    </div>
                </main>
            </div>
        </div>
    )
}
