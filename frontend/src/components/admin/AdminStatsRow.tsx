import { Briefcase, Users, UserSquare2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
    title: string;
    value: string;
    trend: "up" | "down" | "neutral";
    trendValue: string;
    icon: React.ElementType;
}

function StatCard({ title, value, trend, trendValue, icon: Icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Icon className="h-5 w-5 text-slate-600" />
                </div>
            </div>
            <div className="flex items-end justify-between mt-auto">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>

                <div className="flex items-center gap-1 mb-1">
                    {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                        {trendValue}
                    </span>
                </div>
            </div>
        </div>
    )
}

export function AdminStatsRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Active Jobs"
                value="142"
                trend="up"
                trendValue="+12%"
                icon={Briefcase}
            />
            <StatCard
                title="Registered Clients"
                value="4,289"
                trend="up"
                trendValue="+5.2%"
                icon={Users}
            />
            <StatCard
                title="Active Runners"
                value="38"
                trend="neutral"
                trendValue="0%"
                icon={UserSquare2}
            />
            <StatCard
                title="Open Disputes"
                value="3"
                trend="down"
                trendValue="-2"
                icon={AlertTriangle}
            />
        </div>
    )
}
