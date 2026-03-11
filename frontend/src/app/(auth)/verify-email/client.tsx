"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { setToken } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export function VerifyEmailClient() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("Verifying your email address...")
    const [role, setRole] = useState<string | null>(null)

    const hasAttempted = useRef(false)

    useEffect(() => {
        if (hasAttempted.current) return
        hasAttempted.current = true

        const token = searchParams.get("token")
        const id = searchParams.get("id")

        if (!token || !id) {
            setStatus("error")
            setMessage("Invalid or missing verification link.")
            return
        }

        api.post<{ message: string; token: string; user: { role: string } }>("/api/auth/verify-email", { token, id })
            .then((res) => {
                setStatus("success")
                setMessage(res.message || "Email verified successfully!")
                setToken(res.token)
                setRole(res.user.role)

                // Automatically redirect after 3 seconds
                setTimeout(() => {
                    router.push(res.user.role === "runner" ? "/onboard" : "/dashboard")
                }, 3000)
            })
            .catch((err) => {
                setStatus("error")
                setMessage(err instanceof Error ? err.message : "Verification failed. The link may have expired or is invalid.")
            })

    }, [searchParams, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-6">

                <div className="flex justify-center">
                    {status === "loading" && <Loader2 className="h-12 w-12 text-[#80f20d] animate-spin" />}
                    {status === "success" && <CheckCircle2 className="h-12 w-12 text-green-500" />}
                    {status === "error" && <XCircle className="h-12 w-12 text-red-500" />}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {status === "loading" && "Verifying Email"}
                        {status === "success" && "Verified!"}
                        {status === "error" && "Verification Failed"}
                    </h2>
                    <p className="text-slate-500">{message}</p>
                </div>

                {status === "success" && (
                    <p className="text-sm border-t border-slate-100 pt-6 text-slate-400">
                        Redirecting you automatically...
                    </p>
                )}

                {status === "error" && (
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full mt-4"
                    >
                        Return to Login
                    </Button>
                )}
            </div>
        </div>
    )
}
