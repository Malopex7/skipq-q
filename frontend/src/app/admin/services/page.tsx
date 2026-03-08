"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { ServiceCategoryTable } from "@/components/admin/ServiceCategoryTable"
import { AddCategoryForm } from "@/components/admin/AddCategoryForm"

export default function AdminServicesPage() {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
                    <div>
                        <h1 className="text-lg font-bold text-slate-900">Service Categories & Pricing</h1>
                        <p className="text-xs font-medium text-slate-500">Configure platform services, pricing, and availability.</p>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-[1200px] mx-auto">
                        <ServiceCategoryTable onAdd={() => setShowForm(true)} />
                    </div>
                </main>
            </div>

            {/* Slide-in form panel */}
            {showForm && <AddCategoryForm onClose={() => setShowForm(false)} />}
        </div>
    )
}
