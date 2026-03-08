import { StatusUpdatePanel } from "@/components/runner/StatusUpdatePanel"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Suspense } from "react"
import { PageHeader } from "@/components/ui/PageHeader"

export default function ActiveJobPage() {
    return (
        <div className="flex justify-center bg-slate-50 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative">

                <PageHeader title="Active Job" backHref="/jobs" className="bg-white" />

                <Suspense fallback={<div className="p-6 animate-pulse bg-white flex-1" />}>
                    <main className="flex-1 px-6 flex flex-col relative z-10 w-full mt-4">
                        <StatusUpdatePanel />
                    </main>
                </Suspense>

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
