"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { ClientProfile } from "@/components/profile/ClientProfile"
import { RunnerProfile } from "@/components/profile/RunnerProfile"
import { useRouter } from "next/navigation"

export default function UnifiedProfilePage() {
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        api.get<{ role: string }>("/api/auth/me")
            .then(user => {
                setRole(user.role)
            })
            .catch(() => {
                router.push("/login")
            })
            .finally(() => setLoading(false))
    }, [router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (role === "runner") {
        return <RunnerProfile />
    }

    return <ClientProfile />
}
