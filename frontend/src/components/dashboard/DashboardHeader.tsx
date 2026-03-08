import { Bell } from "lucide-react"

interface DashboardHeaderProps {
    userName: string;
    avatarUrl?: string;
}

export function DashboardHeader({ userName, avatarUrl }: DashboardHeaderProps) {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-20">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Good Morning,</p>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Hi, {userName}</h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border-2 border-white shadow-sm">
                    {avatarUrl
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={avatarUrl} alt={userName} className="h-full w-full object-cover" />
                        : <span className="font-bold text-slate-500">{userName.charAt(0)}</span>
                    }
                </div>
            </div>
        </div>
    )
}
