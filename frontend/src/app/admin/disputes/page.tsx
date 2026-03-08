"use client"

import { useState } from "react"
import { DisputesTable, type Dispute } from "@/components/admin/DisputesTable"
import { DisputeDetailPanel } from "@/components/admin/DisputeDetailPanel"

export default function AdminDisputesPage() {
    const [selected, setSelected] = useState<Dispute | null>(null)

    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
                <div>
                    <h1 className="text-lg font-bold text-slate-900">Disputes & Escalations</h1>
                    <p className="text-xs font-medium text-slate-500">Review and resolve platform disputes between clients and runners.</p>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-[1400px] mx-auto">
                    <DisputesTable onSelect={setSelected} selectedId={selected?.id ?? null} />
                </div>
            </main>

            {selected && (
                <DisputeDetailPanel dispute={selected} onClose={() => setSelected(null)} />
            )}
        </>
    )
}
