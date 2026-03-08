import { PageHeader } from "@/components/ui/PageHeader"
import { BranchList } from "@/components/booking/BranchList"

export default function SelectBranchPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex justify-center pb-8">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-screen">
                <PageHeader
                    title="Choose a branch"
                    subtitle="Home Affairs"
                    backHref="/book"
                    className="bg-slate-50"
                />

                <main className="px-6 py-2">
                    <BranchList />
                </main>
            </div>
        </div>
    )
}
