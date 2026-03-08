"use client"

import { useState } from "react"
import { Search } from "lucide-react"

const USERS = [
    { id: "u1", name: "Thabo Mokoena", email: "thabo@email.com", role: "Client", registered: "Oct 10, 2023", status: "Active" },
    { id: "u2", name: "Sipho Khumalo", email: "sipho@email.com", role: "Runner", registered: "Oct 12, 2023", status: "Active" },
    { id: "u3", name: "Sarah Johnson", email: "sarah@email.com", role: "Client", registered: "Oct 13, 2023", status: "Active" },
    { id: "u4", name: "David Nkosi", email: "david@email.com", role: "Runner", registered: "Sep 5, 2023", status: "Suspended" },
    { id: "u5", name: "Admin User", email: "admin@skipq.co.za", role: "Admin", registered: "Jan 1, 2023", status: "Active" },
    { id: "u6", name: "Michael Roberts", email: "michael@email.com", role: "Client", registered: "Nov 1, 2023", status: "Active" },
]

type Role = "All" | "Client" | "Runner" | "Admin"

const ROLE_COLORS: Record<string, string> = {
    Client: "bg-blue-100 text-blue-700",
    Runner: "bg-purple-100 text-purple-700",
    Admin: "bg-slate-200 text-slate-700",
}

export function UserTable() {
    const [search, setSearch] = useState("")
    const [role, setRole] = useState<Role>("All")

    const filtered = USERS.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
        const matchRole = role === "All" || u.role === role
        return matchSearch && matchRole
    })

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent"
                    />
                </div>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value as Role)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                >
                    <option value="All">All Roles</option>
                    <option value="Client">Client</option>
                    <option value="Runner">Runner</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            {/* Table */}
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
                        {filtered.map((user, i) => (
                            <tr key={user.id} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/50" : "bg-slate-50/50 hover:bg-slate-100/50"}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${ROLE_COLORS[user.role]}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.registered}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${user.status === "Active" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex justify-end gap-3">
                                    <button className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">View</button>
                                    {user.status === "Active" && user.role !== "Admin" && (
                                        <button className="font-semibold text-red-500 hover:text-red-700 transition-colors">Suspend</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
                <span>Showing {filtered.length} of {USERS.length} users</span>
                <div className="flex items-center gap-1">
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 font-medium text-xs" disabled>Previous</button>
                    <button className="px-3 py-1.5 rounded-md bg-slate-900 text-white font-medium text-xs">1</button>
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 font-medium text-xs">Next</button>
                </div>
            </div>
        </div>
    )
}
