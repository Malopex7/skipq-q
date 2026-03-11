import { X, Mail, Phone, Calendar, Shield, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User } from "./UserTable"
import { api } from "@/lib/api"

interface UserDetailPanelProps {
    user: User
    onClose: () => void
    onRefresh: () => void
}

const ROLE_COLORS: Record<string, string> = {
    client: "bg-blue-100 text-blue-700",
    runner: "bg-purple-100 text-purple-700",
    admin: "bg-slate-200 text-slate-700",
}

export function UserDetailPanel({ user, onClose, onRefresh }: UserDetailPanelProps) {
    const handleSuspend = async () => {
        if (!confirm("Suspend this user?")) return
        await api.patch(`/api/users/${user._id}/suspend`)
        onRefresh()
        onClose()
    }

    const handleActivate = async () => {
        if (!confirm("Activate this user?")) return
        await api.patch(`/api/users/${user._id}/activate`)
        onRefresh()
        onClose()
    }

    return (
        <aside className="fixed inset-y-0 right-0 w-[440px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50">
            {/* Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 shrink-0 bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
                        {user.name[0]?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900 leading-tight">{user.name}</h2>
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${ROLE_COLORS[user.role] ?? "bg-slate-100 text-slate-700"}`}>
                            {user.role}
                        </span>
                    </div>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Contact Info */}
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Mail className="h-4 w-4 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-500">Email Address</div>
                                <div className="text-sm font-medium text-slate-900">{user.email}</div>
                            </div>
                        </div>
                        {/* If phone is missing from User interface right now, we can omit or show generic. */}
                        <div className="flex items-start gap-3">
                            <Phone className="h-4 w-4 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-500">Phone Number</div>
                                <div className="text-sm font-medium text-slate-900 text-slate-400 italic">Not provided</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Account Details</h3>
                    <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 flex items-center gap-2"><Shield className="h-4 w-4" /> Role</span>
                            <span className="font-semibold text-slate-900 capitalize">{user.role}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 flex items-center gap-2"><Activity className="h-4 w-4" /> Status</span>
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.isActive ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
                                {user.isActive ? "Active" : "Suspended"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 flex items-center gap-2"><Calendar className="h-4 w-4" /> Registered</span>
                            <span className="font-semibold text-slate-900">
                                {new Date(user.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {user.role !== "admin" && (
                            user.isActive ? (
                                <Button onClick={handleSuspend} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                    Suspend Account
                                </Button>
                            ) : (
                                <Button onClick={handleActivate} className="w-full bg-green-600 text-white hover:bg-green-700">
                                    Activate Account
                                </Button>
                            )
                        )}
                        <Button variant="outline" className="w-full">
                            Reset Password
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
