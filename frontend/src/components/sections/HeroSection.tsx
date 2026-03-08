import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20 mb-8">
                    Now live in major South African cities
                </div>
                <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                    Skip the Queue.<br />
                    <span className="text-primary">Send a Runner.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                    Don&apos;t waste your day at Home Affairs, the Clinic, or the Licensing Department.
                    Book a verified Queue Runner to hold your spot, and arrive only when it&apos;s your turn.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8" asChild>
                        <Link href="/book">Book a Runner Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8" asChild>
                        <Link href="#how-it-works">See How it Works</Link>
                    </Button>
                </div>

                {/* Trust Signals */}
                <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified Runners
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Real-time Tracking
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Safe & Insured
                    </div>
                </div>
            </div>
        </section>
    )
}
