import { SectionHeader } from "@/components/ui/SectionHeader"
import { PageContainer } from "@/components/ui/PageContainer"
import { Clock, MapPin, Smartphone } from "lucide-react"

const STEPS = [
    {
        title: "Choose your queue",
        description: "Select the government department, clinic, or store where you need someone to wait.",
        icon: MapPin,
    },
    {
        title: "Book a runner",
        description: "A verified local runner accepts your job and heads to the location immediately.",
        icon: Smartphone,
    },
    {
        title: "Track in real time",
        description: "Monitor their progress. Arrive only when they are near the front of the line.",
        icon: Clock,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-slate-50/50">
            <PageContainer>
                <SectionHeader
                    title="How skipQ works"
                    subtitle="Three simple steps to claim your day back. We wait in line so you don't have to."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16">
                    {STEPS.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                                <step.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </PageContainer>
        </section>
    )
}
