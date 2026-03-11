"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { api } from "@/lib/api"

export interface User {
    _id: string
    name: string
    email: string
    role: string
    isActive: boolean
    createdAt: string
}


type RoleFilter = "All" | "client" | "runner" | "admin"

const ROLE_COLORS: Record<string, string> = {
    client: "bg-blue-100 text-blue-700",
    runner: "bg-purple-100 text-purple-700",
    admin: "bg-slate-200 text-slate-700",
}

function SkeletonRow() {
    return (
        <tr>
            {[...Array(5)].map((_, i) => (
                <td key={i} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded animate-pulse w-28" /></td>
            ))}
        </tr>
    )
}

export function UserTable({ onSelect, selectedId }: { onSelect?: (u: User) => void, selectedId?: string | null }) {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [role, setRole] = useState<RoleFilter>("All")

    const fetchUsers = () => {
        setLoading(true)
        api.get<User[]>("/api/users")
            .then(setUsers)
            .catch(() => setUsers([]))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchUsers() }, [])

    const handleSuspend = async (id: string) => {
        if (!confirm("Suspend this user?")) return
        await api.patch(`/api/users/${id}/suspend`)
        fetchUsers()
    }

    const handleActivate = async (id: string) => {
        if (!confirm("Activate this user?")) return
        await api.patch(`/api/users/${id}/activate`)
        fetchUsers()
    }

    const filtered = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
        const matchRole = role === "All" || u.role === role
        return matchSearch && matchRole
    })

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" placeholder="Search by name or email..." value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent" />
                </div>
                <select value={role} onChange={e => setRole(e.target.value as RoleFilter)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white">
                    <option value="All">All Roles</option>
                    <option value="client">Client</option>
                    <option value="runner">Runner</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading
                            ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            : filtered.length === 0
                                ? <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">No users found</td></tr>
                                : filtered.map((user, i) => (
                                    <tr key={user._id} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/50" : "bg-slate-50/50 hover:bg-slate-100/50"}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
                                                    {user.name[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                                                    <div className="text-xs text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize ${ROLE_COLORS[user.role] ?? "bg-slate-100 text-slate-700"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {new Date(user.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.isActive ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
                                                {user.isActive ? "Active" : "Suspended"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex justify-end gap-3">
                                            <button onClick={() => onSelect?.(user)} className={`font-semibold transition-colors ${selectedId === user._id ? "text-slate-900" : "text-blue-600 hover:text-blue-800"}`}>View</button>
                                            {user.isActive && user.role !== "admin" ? (
                                                <button onClick={() => handleSuspend(user._id)} className="font-semibold text-red-500 hover:text-red-700 transition-colors">Suspend</button>
                                            ) : (
                                                !user.isActive && (
                                                    <button onClick={() => handleActivate(user._id)} className="font-semibold text-green-600 hover:text-green-800 transition-colors">Activate</button>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                <span>Showing {filtered.length} of {users.length} users</span>
                <div className="flex items-center gap-1">
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 font-medium text-xs" disabled>Previous</button>
                    <button className="px-3 py-1.5 rounded-md bg-slate-900 text-white font-medium text-xs">1</button>
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium text-xs">Next</button>
                </div>
            </div>
        </div>
    )
}
