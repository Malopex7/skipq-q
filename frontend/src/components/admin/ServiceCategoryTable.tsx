"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

const SERVICES = [
    { id: "s1", icon: "🏛️", name: "Home Affairs", basePrice: "R 85.00", ratePerMin: "R 0.50", active: true },
    { id: "s2", icon: "🚗", name: "Vehicle Licensing", basePrice: "R 95.00", ratePerMin: "R 0.60", active: true },
    { id: "s3", icon: "❤️", name: "Clinic / Hospital", basePrice: "R 70.00", ratePerMin: "R 0.45", active: true },
    { id: "s4", icon: "⚖️", name: "SARS / Tax Office", basePrice: "R 100.00", ratePerMin: "R 0.65", active: false },
    { id: "s5", icon: "📄", name: "Bank Queue", basePrice: "R 60.00", ratePerMin: "R 0.40", active: true },
]

export function ServiceCategoryTable({ onAdd }: { onAdd: () => void }) {
    const [services, setServices] = useState(SERVICES)

    const toggle = (id: string) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Service Categories</h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Manage platform services and their pricing.</p>
                </div>
                <Button onClick={onAdd} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm">
                    + Add New Category
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Base Price</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rate/Min</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map((svc, i) => (
                            <tr key={svc.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{svc.icon}</span>
                                        <span className="text-sm font-semibold text-slate-900">{svc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">{svc.basePrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">{svc.ratePerMin}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => toggle(svc.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${svc.active ? "bg-green-500" : "bg-slate-300"}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${svc.active ? "translate-x-6" : "translate-x-1"}`} />
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 ml-auto">
                                        <Pencil className="h-3.5 w-3.5" />
                                        Edit
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
