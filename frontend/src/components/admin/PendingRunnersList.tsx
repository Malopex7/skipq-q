import { Button } from "@/components/ui/button"

const PENDING_RUNNERS = [
    { id: "r1", name: "Jabulani M.", date: "Today, 10:23 AM" },
    { id: "r2", name: "Precious T.", date: "Yesterday" },
    { id: "r3", name: "Lwazi S.", date: "Oct 24, 2023" },
]

export function PendingRunnersList() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-slate-900">Pending Applications</h2>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
            </div>

            <div className="p-2">
                {PENDING_RUNNERS.map((runner) => (
                    <div key={runner.id} className="flex flex-col gap-3 p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{runner.name}</h4>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">Applied: {runner.date}</p>
                            </div>
                            <button className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">
                                View Docs
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800">
                                Approve
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-red-700 border-red-200 hover:bg-red-50 hover:text-red-800">
                                Reject
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-4 pt-2">
                <Button variant="ghost" className="w-full text-sm font-semibold text-slate-600">
                    View All Applications
                </Button>
            </div>
        </div>
    )
}
