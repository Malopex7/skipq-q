"use client"

import { useEffect, useState } from "react"
import { LogOut, User, Mail, Phone, Loader2, ChevronRight, Settings, Shield, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientBottomNav } from "@/components/dashboard/ClientBottomNav"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { clearToken } from "@/lib/auth"

interface UserProfile {
    name: string
    email: string
    phone?: string
    avatarUrl?: string
    role: string
}

export function ClientProfile() {
    const router = useRouter()
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get<UserProfile>("/api/auth/me")
            .then(userData => {
                setUser(userData)
            })
            .catch(err => {
                console.error("Failed to fetch user data", err)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleLogout = () => {
        clearToken()
        router.push("/login")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
                <Shield className="h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium mb-4">Please log in to view your profile</p>
                <Button onClick={() => router.push("/login")}>Go to Login</Button>
            </div>
        )
    }

    const initials = user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    const sections = [
        {
            title: "Account Information",
            items: [
                { label: "Full Name", value: user.name, icon: User },
                { label: "Email Address", value: user.email, icon: Mail },
                { label: "Phone Number", value: user.phone || "Not provided", icon: Phone },
            ]
        },
        {
            title: "Settings & Privacy",
            items: [
                { label: "Notifications", href: "#", icon: Bell },
                { label: "Security & Login", href: "#", icon: Shield },
                { label: "App Settings", href: "#", icon: Settings },
            ]
        }
    ]

    return (
        <div className="flex justify-center bg-slate-100 min-h-screen">
            <div className="w-full max-w-md bg-white min-h-screen flex flex-col pb-24 border-x border-slate-200 shadow-sm">

                {/* Header Section */}
                <div className="bg-slate-950 pt-16 pb-12 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_-20%,#80f20d,transparent_70%)]" />
                    <div className="relative z-10">
                        <div className="mx-auto h-24 w-24 rounded-full bg-[#80f20d] flex items-center justify-center text-slate-950 font-black text-3xl border-4 border-white shadow-xl mb-4 transform hover:scale-105 transition-transform">
                            {user.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover rounded-full" />
                            ) : initials}
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">{user.name}</h1>
                        <p className="text-white/60 text-sm font-medium mt-1 uppercase tracking-widest">{user.role} member</p>
                    </div>
                </div>

                {/* Content Section */}
                <main className="flex-1 px-6 py-8 space-y-8 bg-white">
                    {sections.map(section => (
                        <div key={section.title}>
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">{section.title}</h3>
                            <div className="space-y-1">
                                {section.items.map(item => (
                                    <div
                                        key={item.label}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#80f20d]/10 group-hover:text-[#80f20d] transition-colors">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                                {'value' in item && <p className="text-sm font-bold text-slate-900">{item.value}</p>}
                                            </div>
                                        </div>
                                        {'href' in item && (
                                            <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Danger Zone */}
                    <div className="pt-4">
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full h-14 font-bold text-red-500 border-2 border-slate-100 hover:bg-red-50 hover:border-red-100 hover:text-red-600 rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out Account
                        </Button>
                        <p className="text-[10px] text-slate-400 text-center mt-6 font-medium">App Version 1.0.2 (Production)</p>
                    </div>
                </main>

                <ClientBottomNav />
            </div>
        </div>
    )
}
