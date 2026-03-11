import { Suspense } from "react"
import { VerifyEmailClient } from "./client"

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailClient />
        </Suspense>
    )
}
