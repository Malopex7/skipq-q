import { PendingApplicationsTable } from "@/components/admin/PendingApplicationsTable"
import { RunnerTable } from "@/components/admin/RunnerTable"

export default function AdminRunnersPage() {
    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
                <div>
                    <h1 className="text-lg font-bold text-slate-900">Runner Management</h1>
                    <p className="text-xs font-medium text-slate-500">Approve applications and oversee active runners.</p>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-[1400px] mx-auto">
                    <PendingApplicationsTable />
                    <RunnerTable />
                </div>
            </main>
        </>
    )
}
