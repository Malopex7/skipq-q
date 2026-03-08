import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background mt-12">
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold tracking-tight text-primary">SkipQ</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                            Skip the queue. Send a runner. The modern way to handle government and daily queues in South Africa.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold">For Clients</h4>
                        <Link href="/book" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Book a Runner</Link>
                        <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
                        <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Supported Queues</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold">For Runners</h4>
                        <Link href="/runner/onboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Become a Runner</Link>
                        <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Runner Login</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold">Legal</h4>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} SkipQ. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
