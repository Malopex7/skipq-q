import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminStatsRow } from "@/components/admin/AdminStatsRow"
import { ActiveJobsTable } from "@/components/admin/ActiveJobsTable"
import { PendingRunnersList } from "@/components/admin/PendingRunnersList"
import { Bell, Search } from "lucide-react"

export default function AdminDashboardPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar - Fixed */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search jobs, users, runners..."
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-80 focus:outline-none focus:ring-2 focus:ring-[#80f20d] focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer">
                            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 leading-tight">Admin User</span>
                                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-tight">Superadmin</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-[1400px] mx-auto">

                        {/* Page Title */}
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
                                <p className="text-sm font-medium text-slate-500 mt-1">Real-time statistics and platform operations monitoring.</p>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <AdminStatsRow />

                        {/* Main Dashboard Grid */}
                        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                            {/* Left Column (Wider) */}
                            <div className="w-full lg:w-2/3 h-full">
                                <ActiveJobsTable />
                            </div>

                            {/* Right Column (Narrower) */}
                            <div className="w-full lg:w-1/3 h-full">
                                <PendingRunnersList />
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
