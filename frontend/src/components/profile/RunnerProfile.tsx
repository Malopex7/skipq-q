"use client"

import { useEffect, useState } from "react"
import { Star, MapPin, LogOut, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RunnerBottomNav } from "@/components/runner/RunnerBottomNav"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { clearToken } from "@/lib/auth"

interface RunnerProfileData {
    _id: string
    isOnline: boolean
    rating: number
    jobsCompleted: number
    serviceAreas: string[]
    userId: {
        name: string
        email: string
        phone: string
        avatarUrl: string
    }
}

interface EarningsData {
    totalEarnings: number
    jobsCompleted: number
}

export function RunnerProfile() {
    const router = useRouter()
    const [profile, setProfile] = useState<RunnerProfileData | null>(null)
    const [earnings, setEarnings] = useState<EarningsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [toggling, setToggling] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, earningsData] = await Promise.all([
                    api.get<RunnerProfileData>("/api/runners/me"),
                    api.get<EarningsData>("/api/runners/me/earnings")
                ])
                setProfile(profileData)
                setEarnings(earningsData)
            } catch (err) {
                console.error("Failed to fetch profile data", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleToggleOnline = async () => {
        if (!profile || toggling) return
        try {
            setToggling(true)
            const res = await api.patch<{ isOnline: boolean }>("/api/runners/me/toggle-online")
            setProfile({ ...profile, isOnline: res.isOnline })
        } catch (err) {
            console.error("Failed to toggle online status", err)
            alert("Failed to update status")
        } finally {
            setToggling(false)
        }
    }

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

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
                <p className="text-slate-500 font-medium mb-4">Failed to load profile</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        )
    }

    const initials = profile.userId.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="flex justify-center bg-slate-100 min-h-screen">
            <div className="w-full max-w-md bg-white min-h-screen flex flex-col pb-24 border-x border-slate-200 shadow-sm">

                {/* Header */}
                <div className="bg-slate-950 pt-16 pb-10 px-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_-20%,#80f20d,transparent_70%)]" />
                    <div className="relative z-10">
                        <div className="mx-auto h-24 w-24 rounded-full bg-[#80f20d] flex items-center justify-center text-slate-950 font-black text-3xl border-4 border-white shadow-xl mb-4 transform hover:scale-105 transition-transform">
                            {profile.userId.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={profile.userId.avatarUrl} alt="" className="h-full w-full object-cover rounded-full" />
                            ) : initials}
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">{profile.userId.name}</h1>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                            <Star className="h-4 w-4 text-[#80f20d] fill-[#80f20d]" />
                            <span className="text-sm font-bold text-white/90">{profile.rating.toFixed(1)} Rating</span>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-white">
                    {[
                        { label: "Jobs Done", value: earnings?.jobsCompleted ?? 0 },
                        { label: "Earnings", value: `R ${earnings?.totalEarnings.toLocaleString() ?? 0}` },
                        { label: "Rating", value: `${profile.rating.toFixed(1)} ★` },
                    ].map(stat => (
                        <div key={stat.label} className="py-5 flex flex-col items-center gap-0.5">
                            <span className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Online Toggle */}
                <div className="px-6 py-6 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div>
                        <p className="text-base font-extrabold text-slate-900 tracking-tight text-lg">Work Availability</p>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            Status: <span className={profile.isOnline ? "text-green-600" : "text-slate-400"}>{profile.isOnline ? "Online & Ready" : "Offline"}</span>
                        </p>
                    </div>
                    <button
                        onClick={handleToggleOnline}
                        disabled={toggling}
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 shadow-inner ${profile.isOnline ? "bg-[#80f20d]" : "bg-slate-200"}`}
                    >
                        {toggling ? (
                            <div className={`h-6 w-6 transform rounded-full bg-white shadow-md flex items-center justify-center transition-all ${profile.isOnline ? "translate-x-9" : "translate-x-1"}`}>
                                <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
                            </div>
                        ) : (
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-all duration-300 ${profile.isOnline ? "translate-x-9" : "translate-x-1"}`} />
                        )}
                    </button>
                </div>

                {/* Profile Fields */}
                <div className="px-6 py-6 space-y-6 border-b border-slate-50 bg-white">
                    <div className="group">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact Details</label>
                        <div className="mt-2 space-y-1">
                            <p className="text-sm font-bold text-slate-900">{profile.userId.name}</p>
                            <p className="text-sm font-medium text-slate-500">{profile.userId.email}</p>
                            <p className="text-sm font-medium text-slate-500">{profile.userId.phone || "No phone added"}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Service Areas</label>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {profile.serviceAreas?.length > 0 ? (
                                profile.serviceAreas.map(area => (
                                    <div key={area} className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-transform">
                                        <MapPin className="h-3 w-3 text-[#80f20d]" />
                                        {area}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 font-medium italic">No service areas defined</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-8 space-y-4 flex-1 bg-slate-50/30">
                    <Button className="w-full h-14 font-black rounded-2xl bg-slate-950 hover:bg-slate-900 text-white shadow-lg active:scale-[0.98] transition-all">
                        <Pencil className="h-5 w-5 mr-3" />
                        Edit Profile Details
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full h-14 font-bold text-red-500 border-2 border-slate-200 hover:bg-red-50 hover:border-red-100 hover:text-red-600 rounded-2xl active:scale-[0.98] transition-all"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Log Out Account
                    </Button>
                </div>

                <RunnerBottomNav />
            </div>
        </div>
    )
}
