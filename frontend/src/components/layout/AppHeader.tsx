import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight text-primary">
                            SkipQ
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
                        <Link href="#services" className="hover:text-foreground transition-colors">Services</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                        Log in
                    </Link>
                    <Button asChild>
                        <Link href="/book">Book a Runner</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
