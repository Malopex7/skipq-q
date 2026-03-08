"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

interface AddCategoryFormProps {
    onClose: (refresh?: boolean) => void
}

export function AddCategoryForm({ onClose }: AddCategoryFormProps) {
    const ICONS = ["🏛️", "🚗", "❤️", "⚖️", "📄", "🏦", "💊", "📮", "🛂", "🏢"]

    const [name, setName] = useState("")
    const [selectedIcon, setSelectedIcon] = useState(ICONS[0])
    const [description, setDescription] = useState("")
    const [basePrice, setBasePrice] = useState("")
    const [ratePerMin, setRatePerMin] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!name || !basePrice || !ratePerMin) return alert("Please fill in required fields")

        setLoading(true)
        try {
            await api.post("/api/services", {
                name,
                icon: selectedIcon,
                description,
                basePrice: Number(basePrice),
                ratePerMin: Number(ratePerMin),
                isActive: true
            })
            onClose(true) // trigger refresh
        } catch (error) {
            console.error("Failed to add category", error)
            alert("Failed to add category")
        } finally {
            setLoading(false)
        }
    }

    return (
        <aside className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 shrink-0">
                <h2 className="text-lg font-bold text-slate-900">Add New Category</h2>
                <button onClick={() => onClose()} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Service Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Home Affairs"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                        {ICONS.map(icon => (
                            <button
                                key={icon}
                                onClick={() => setSelectedIcon(icon)}
                                className={`h-12 text-2xl border rounded-lg transition-colors ${selectedIcon === icon ? 'border-primary bg-primary/10' : 'border-slate-200 hover:border-primary hover:bg-primary/5'}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Brief description of this service category..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Base Price (R) *</label>
                        <input
                            type="number"
                            value={basePrice}
                            onChange={e => setBasePrice(e.target.value)}
                            placeholder="85.00"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Rate per Min (R) *</label>
                        <input
                            type="number"
                            value={ratePerMin}
                            onChange={e => setRatePerMin(e.target.value)}
                            placeholder="0.50"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3 shrink-0">
                <Button onClick={() => onClose()} variant="outline" className="flex-1 font-bold" disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading} className="flex-1 font-bold bg-slate-900 hover:bg-slate-800 text-white">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Category
                </Button>
            </div>
        </aside>
    )
}
