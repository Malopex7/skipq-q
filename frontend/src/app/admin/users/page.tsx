import { UserTable } from "@/components/admin/UserTable"

export default function AdminUsersPage() {
    return (
        <>
            <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
                <div>
                    <h1 className="text-lg font-bold text-slate-900">User Management</h1>
                    <p className="text-xs font-medium text-slate-500">Manage platform clients, runners, and admins.</p>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-[1400px] mx-auto">
                    <UserTable />
                </div>
            </main>
        </>
    )
}
