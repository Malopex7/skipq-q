import { PageHeader } from "@/components/ui/PageHeader"
import { BookingSummaryCard } from "@/components/booking/BookingSummaryCard"
import { BookingForm } from "@/components/booking/BookingForm"

export default function BookingDetailsPage() {
    return (
        <div className="min-h-screen bg-white flex justify-center pb-32">
            <div className="w-full max-w-md bg-white border-x min-h-screen relative">
                <PageHeader
                    title="Booking Details"
                    backHref="/book/location"
                />

                <main className="px-6 py-4 flex flex-col gap-8">
                    <BookingSummaryCard
                        serviceName="Home Affairs Queue"
                        branchName="Randburg Branch"
                    />

                    <BookingForm />
                </main>
            </div>
        </div>
    )
}
