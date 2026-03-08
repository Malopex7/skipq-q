import { StatusUpdatePanel } from "@/components/runner/StatusUpdatePanel"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function ActiveJobPage() {
    return (
        <div className="flex justify-center bg-slate-50 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative">

                {/* Header */}
                <div className="px-6 pt-12 pb-6 flex flex-col items-center justify-center border-b border-slate-200 bg-white">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 bg-primary/10 px-3 py-1 rounded-full">Active Job</span>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Home Affairs Queue</h1>
                    <p className="text-sm font-semibold text-slate-500 mt-1">Client: Thabo M.</p>
                </div>

                <main className="flex-1 px-6 flex flex-col relative z-10 w-full">
                    <StatusUpdatePanel />
                </main>

                {/* Footer Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-8 pb-10 bg-slate-50 z-50">
                    <div className="max-w-md mx-auto flex justify-center">
                        <Link href="#" className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors">
                            <AlertCircle className="h-4 w-4" />
                            Report an Issue
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
