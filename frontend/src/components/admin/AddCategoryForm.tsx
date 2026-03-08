import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface AddCategoryFormProps {
    onClose: () => void
}

export function AddCategoryForm({ onClose }: AddCategoryFormProps) {
    const ICONS = ["🏛️", "🚗", "❤️", "⚖️", "📄", "🏦", "💊", "📮", "🛂", "🏢"]

    return (
        <aside className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 shrink-0">
                <h2 className="text-lg font-bold text-slate-900">Add New Category</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Service Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Home Affairs"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Icon</label>
                    <div className="grid grid-cols-5 gap-2">
                        {ICONS.map(icon => (
                            <button key={icon} className="h-12 text-2xl border border-slate-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea
                        rows={3}
                        placeholder="Brief description of this service category..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Base Price (R)</label>
                        <input
                            type="number"
                            placeholder="85.00"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Rate per Min (R)</label>
                        <input
                            type="number"
                            placeholder="0.50"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3 shrink-0">
                <Button onClick={onClose} variant="outline" className="flex-1 font-bold">Cancel</Button>
                <Button className="flex-1 font-bold bg-slate-900 hover:bg-slate-800 text-white">Save Category</Button>
            </div>
        </aside>
    )
}
