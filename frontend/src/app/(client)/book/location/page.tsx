"use client"

import { PageHeader } from "@/components/ui/PageHeader"
import { BranchList } from "@/components/booking/BranchList"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function BranchSelectionContent() {
    const searchParams = useSearchParams()
    const serviceId = searchParams.get("service")

    return (
        <div className="w-full max-w-md bg-slate-50 border-x min-h-screen">
            <PageHeader
                title="Choose a branch"
                subtitle={serviceId ? `Service: ${serviceId}` : "Select Location"}
                backHref="/book"
                className="bg-slate-50"
            />

            <main className="px-6 py-2">
                <BranchList serviceId={serviceId || ""} />
            </main>
        </div>
    )
}

export default function SelectBranchPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex justify-center pb-8">
            <Suspense fallback={<div className="w-full max-w-md bg-slate-50 border-x min-h-screen p-6 animate-pulse" />}>
                <BranchSelectionContent />
            </Suspense>
        </div>
    )
}
