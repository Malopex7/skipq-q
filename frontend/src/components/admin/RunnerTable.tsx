import { Star } from "lucide-react"

const RUNNERS = [
    { id: "r1", name: "Sipho Khumalo", jobs: 142, rating: 4.9, status: "Online" },
    { id: "r2", name: "David Nkosi", jobs: 89, rating: 4.7, status: "Offline" },
    { id: "r3", name: "Lerato Pretorius", jobs: 56, rating: 4.8, status: "Online" },
    { id: "r4", name: "Thandeka Dlamini", jobs: 14, rating: 4.5, status: "Suspended" },
]

const STATUS_COLOR: Record<string, string> = {
    Online: "bg-green-50 text-green-700 ring-green-600/20",
    Offline: "bg-slate-100 text-slate-500 ring-slate-400/20",
    Suspended: "bg-red-50 text-red-700 ring-red-600/20",
}

export function RunnerTable() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Active Runners</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">All approved and verified queue runners.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Jobs Done</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {RUNNERS.map((runner, i) => (
                            <tr key={runner.id} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/40" : "bg-slate-50/50 hover:bg-slate-100/50"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">{runner.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{runner.jobs}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-semibold text-slate-800">{runner.rating}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_COLOR[runner.status]}`}>
                                        {runner.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-3">
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View</button>
                                    {runner.status !== "Suspended" && (
                                        <button className="text-sm font-semibold text-red-500 hover:text-red-700">Suspend</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
