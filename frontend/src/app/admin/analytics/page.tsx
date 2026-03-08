import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AnalyticsKPIRow } from "@/components/admin/AnalyticsKPIRow"
import { RevenueChart, JobsByCategoryChart } from "@/components/admin/AnalyticsCharts"
import { TopRunnersTable, RegionalTable } from "@/components/admin/AnalyticsTables"

export default function AdminAnalyticsPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
                    <div>
                        <h1 className="text-lg font-bold text-slate-900">Analytics & Reports</h1>
                        <p className="text-xs font-medium text-slate-500">Platform-wide performance metrics and growth trends.</p>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-[1400px] mx-auto">

                        {/* KPI Row */}
                        <AnalyticsKPIRow />

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <RevenueChart />
                            <JobsByCategoryChart />
                        </div>

                        {/* Tables Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <TopRunnersTable />
                            <RegionalTable />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
