import { PageHeader } from "@/components/ui/PageHeader"
import { ServiceCategoryGrid } from "@/components/booking/ServiceCategoryGrid"

export default function SelectServicePage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex justify-center pb-24">
            <div className="w-full max-w-md bg-white min-h-screen relative shadow-sm border-x">
                <PageHeader
                    title="What queue do you need?"
                    subtitle="Select a category to find nearby runners."
                    backHref="/"
                />

                <main className="px-6 py-4">
                    <ServiceCategoryGrid />
                </main>
            </div>
        </div>
    )
}
