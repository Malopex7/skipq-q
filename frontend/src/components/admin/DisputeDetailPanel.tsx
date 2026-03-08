import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dispute } from "./DisputesTable"

const CHAT = [
    { from: "Client", text: "The runner never showed up. I waited 2 hours!" },
    { from: "Runner", text: "I was at the location but couldn't find the client." },
    { from: "Client", text: "I was at the main entrance as agreed." },
    { from: "Admin", text: "We are investigating this issue. Please stand by." },
]

interface DisputeDetailPanelProps {
    dispute: Dispute
    onClose: () => void
}

export function DisputeDetailPanel({ dispute, onClose }: DisputeDetailPanelProps) {
    return (
        <aside className="fixed inset-y-0 right-0 w-[440px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 shrink-0">
                <div>
                    <h2 className="text-base font-bold text-slate-900">{dispute.id}</h2>
                    <p className="text-xs text-slate-500 font-medium">{dispute.issue} · {dispute.date}</p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Job Summary */}
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Job Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Job ID</span>
                            <span className="font-semibold text-slate-900">{dispute.jobId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Client</span>
                            <span className="font-semibold text-slate-900">{dispute.client}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Runner</span>
                            <span className="font-semibold text-slate-900">{dispute.runner}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Issue Type</span>
                            <span className="font-semibold text-slate-900">{dispute.issue}</span>
                        </div>
                    </div>
                </div>

                {/* Chat Transcript */}
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Chat Transcript</h3>
                    <div className="space-y-3">
                        {CHAT.map((msg, i) => (
                            <div key={i} className={`flex flex-col gap-0.5 ${msg.from === "Client" ? "items-start" : msg.from === "Runner" ? "items-end" : "items-center"}`}>
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{msg.from}</span>
                                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${msg.from === "Client"
                                        ? "bg-slate-100 text-slate-800"
                                        : msg.from === "Runner"
                                            ? "bg-blue-100 text-blue-900"
                                            : "bg-amber-50 text-amber-800 border border-amber-200 text-center"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resolution Actions */}
                <div className="p-6">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Resolution Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="h-10 text-sm font-bold border-blue-200 text-blue-700 hover:bg-blue-50">
                            Refund Client
                        </Button>
                        <Button variant="outline" className="h-10 text-sm font-bold border-purple-200 text-purple-700 hover:bg-purple-50">
                            Pay Runner
                        </Button>
                        <Button variant="outline" className="h-10 text-sm font-bold border-red-200 text-red-700 hover:bg-red-50">
                            Ban Runner
                        </Button>
                        <Button className="h-10 text-sm font-bold bg-green-600 hover:bg-green-700 text-white col-span-2">
                            ✓ Mark as Resolved
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
