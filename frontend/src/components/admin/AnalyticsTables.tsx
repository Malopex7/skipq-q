import { Star } from "lucide-react"

const TOP_RUNNERS = [
    { rank: 1, name: "Sipho Khumalo", jobs: 142, rating: 4.9, earnings: "R 14,800" },
    { rank: 2, name: "Lerato Pretorius", jobs: 118, rating: 4.8, earnings: "R 12,100" },
    { rank: 3, name: "David Nkosi", jobs: 89, rating: 4.7, earnings: "R 9,550" },
    { rank: 4, name: "Thandeka Dlamini", jobs: 73, rating: 4.6, earnings: "R 7,200" },
    { rank: 5, name: "Jabulani M.", jobs: 61, rating: 4.5, earnings: "R 6,400" },
]

const REGIONS = [
    { region: "Johannesburg", activeJobs: 68, revenue: "R 48,200" },
    { region: "Sandton/Midrand", activeJobs: 34, revenue: "R 28,900" },
    { region: "Pretoria", activeJobs: 22, revenue: "R 18,500" },
    { region: "East Rand", activeJobs: 12, revenue: "R 11,200" },
    { region: "West Rand", activeJobs: 6, revenue: "R 5,800" },
]

export function TopRunnersTable() {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Top 5 Runners</h3>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Jobs</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Earnings</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {TOP_RUNNERS.map(r => (
                        <tr key={r.rank} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 text-sm font-bold text-slate-400">{r.rank}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">{r.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{r.jobs}</td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-semibold text-slate-800">{r.rating}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-green-700">{r.earnings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function RegionalTable() {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Regional Performance</h3>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Region</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Jobs</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {REGIONS.map(r => (
                        <tr key={r.region} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 text-sm font-semibold text-slate-900">{r.region}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{r.activeJobs}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-slate-800">{r.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
