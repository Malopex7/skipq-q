import { TrendingUp, Briefcase, Users, Activity } from "lucide-react"

const KPIS = [
    { label: "Revenue (MTD)", value: "R 124,880", trend: "+18%", icon: TrendingUp, trendUp: true },
    { label: "Jobs Completed", value: "1,342", trend: "+24%", icon: Briefcase, trendUp: true },
    { label: "New Users", value: "287", trend: "+11%", icon: Users, trendUp: true },
    { label: "Runner Utilisation", value: "76%", trend: "+3%", icon: Activity, trendUp: true },
]

export function AnalyticsKPIRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {KPIS.map((kpi) => (
                <div key={kpi.label} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-semibold text-slate-500">{kpi.label}</span>
                        <div className="p-2 bg-[#80f20d]/10 rounded-lg">
                            <kpi.icon className="h-5 w-5 text-[#80f20d]" />
                        </div>
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                        <span className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</span>
                        <span className={`text-sm font-semibold mb-0.5 ${kpi.trendUp ? "text-green-600" : "text-red-600"}`}>
                            {kpi.trend}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
