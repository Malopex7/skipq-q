import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const PENDING = [
    { id: "p1", name: "Jabulani M.", date: "Today, 10:23 AM", idUploaded: true },
    { id: "p2", name: "Precious T.", date: "Yesterday, 2:05 PM", idUploaded: true },
    { id: "p3", name: "Lwazi S.", date: "Oct 24, 2023", idUploaded: false },
]

export function PendingApplicationsTable() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Pending Applications</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Awaiting ID verification and approval.</p>
                </div>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">{PENDING.length} Pending</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID Document</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {PENDING.map((runner, i) => (
                            <tr key={runner.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{runner.name}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{runner.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {runner.idUploaded ? (
                                        <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            View ID
                                        </button>
                                    ) : (
                                        <span className="text-sm text-slate-400 italic">Not uploaded</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-end gap-2">
                                        <Button size="sm" className="h-8 text-xs font-bold bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                                        <Button size="sm" variant="outline" className="h-8 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50">Reject</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
