"use client"

import { PageHeader } from "@/components/ui/PageHeader"
import { BookingSummaryCard } from "@/components/booking/BookingSummaryCard"
import { BookingForm } from "@/components/booking/BookingForm"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { api } from "@/lib/api"

interface ServiceCategory {
    _id: string
    name: string
    basePrice: number
}

function BookingDetailsContent() {
    const searchParams = useSearchParams()
    const serviceId = searchParams.get("service") || ""
    const branchName = searchParams.get("branch") || ""

    const [serviceName, setServiceName] = useState("Loading...")

    useEffect(() => {
        if (!serviceId) return
        api.get<ServiceCategory[]>("/api/services")
            .then(data => {
                const s = data.find(x => x._id === serviceId)
                if (s) setServiceName(s.name)
            })
            .catch(console.error)
    }, [serviceId])

    return (
        <div className="w-full max-w-md bg-white border-x min-h-screen relative">
            <PageHeader
                title="Booking Details"
                backHref={`/book/location?service=${serviceId}`}
            />

            <main className="px-6 py-4 flex flex-col gap-8">
                <BookingSummaryCard
                    serviceName={serviceName}
                    branchName={branchName}
                />

                <BookingForm serviceId={serviceId} serviceName={serviceName} branchName={branchName} />
            </main>
        </div>
    )
}

export default function BookingDetailsPage() {
    return (
        <div className="min-h-screen bg-white flex justify-center pb-32">
            <Suspense fallback={<div className="w-full max-w-md bg-white border-x min-h-screen p-6 animate-pulse" />}>
                <BookingDetailsContent />
            </Suspense>
        </div>
    )
}
