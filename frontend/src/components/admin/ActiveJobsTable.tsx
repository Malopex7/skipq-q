import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

const ACTIVE_JOBS = [
    { id: "JOB-2938", client: "Thabo M.", runner: "Sipho K.", service: "Smart ID", branch: "Randburg HA", status: "In Progress", time: "1h 45m" },
    { id: "JOB-2939", client: "Sarah J.", runner: "David N.", service: "Vehicle License", branch: "Sandton Traffic", status: "Arrived", time: "22m" },
    { id: "JOB-2940", client: "Michael R.", runner: "Lerato P.", service: "Passport", branch: "Edenvale HA", status: "Waiting", time: "55m" },
    { id: "JOB-2941", client: "Aisha T.", runner: "Waiting...", service: "Smart ID", branch: "Midrand HA", status: "Matching", time: "5m" },
]

export function ActiveJobsTable() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Progress": return "bg-blue-50 text-blue-700 ring-blue-600/20";
            case "Arrived": return "bg-purple-50 text-purple-700 ring-purple-600/20";
            case "Waiting": return "bg-orange-50 text-orange-700 ring-orange-600/20";
            case "Matching": return "bg-slate-100 text-slate-700 ring-slate-600/20";
            default: return "bg-slate-50 text-slate-700 ring-slate-200";
        }
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flexflex-col h-full">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-900">Live Active Jobs</h2>
                <Button variant="outline" size="sm" className="h-8">View All</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job ID</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Runner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service & Branch</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {ACTIVE_JOBS.map((job) => (
                            <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{job.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{job.client}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{job.runner}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    <div className="font-medium text-slate-900">{job.service}</div>
                                    <div className="text-xs text-slate-500">{job.branch}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(job.status)}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">{job.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
