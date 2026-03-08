"use client"

import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

interface Service {
    _id: string
    icon: string
    name: string
    basePrice: number
    ratePerMin: number
    isActive: boolean
}

export function ServiceCategoryTable({ onAdd, refreshNonce }: { onAdd: () => void, refreshNonce?: number }) {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    const fetchServices = () => {
        setLoading(true)
        api.get<Service[]>("/api/services")
            .then(setServices)
            .catch(() => setServices([]))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchServices() }, [refreshNonce])

    const toggle = async (id: string) => {
        await api.patch(`/api/services/${id}/toggle`)
        fetchServices()
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
                        {loading
                            ? [...Array(4)].map((_, i) => (
                                <tr key={i}>{[...Array(5)].map((__, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse w-24" /></td>)}</tr>
                            ))
                            : services.length === 0
                                ? <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">No services yet — add one above</td></tr>
                                : services.map((s, i) => (
                                    <tr key={s._id} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/40" : "bg-slate-50/50 hover:bg-slate-100/50"}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{s.icon || "🏛️"}</span>
                                                <span className="text-sm font-semibold text-slate-900">{s.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">R {s.basePrice.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">R {s.ratePerMin.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => toggle(s._id)}
                                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${s.isActive ? "bg-lime-400" : "bg-slate-200"}`}>
                                                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${s.isActive ? "translate-x-4" : "translate-x-1"}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="text-slate-400 hover:text-slate-700 transition-colors">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
