"use client"

import { useState, useCallback } from "react"
import { UserTable, type User } from "@/components/admin/UserTable"
import { UserDetailPanel } from "@/components/admin/UserDetailPanel"

export default function AdminUsersPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [refreshNonce, setRefreshNonce] = useState(0)

    const handleRefresh = useCallback(() => {
        setRefreshNonce(n => n + 1)
        setSelectedUser(null)
    }, [])

    return (
        <div className="flex-1 flex flex-col relative h-full">
            <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
                <div>
                    <h1 className="text-lg font-bold text-slate-900">User Management</h1>
                    <p className="text-xs font-medium text-slate-500">Manage platform clients, runners, and admins.</p>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-[1400px] mx-auto">
                    {/* HACK: We use a key to force rerender of UserTable when refreshNonce changes, ensuring it refetches */}
                    <UserTable key={refreshNonce} onSelect={setSelectedUser} selectedId={selectedUser?._id ?? null} />
                </div>
            </main>

            {selectedUser && (
                <UserDetailPanel
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onRefresh={handleRefresh}
                />
            )}
        </div>
    )
}
