import { SectionHeader } from "@/components/ui/SectionHeader"
import { PageContainer } from "@/components/ui/PageContainer"
import { SurfaceCard } from "@/components/ui/SurfaceCard"
import { Star } from "lucide-react"

const TESTIMONIALS = [
    {
        text: "I used to take a full day of leave just to renew my car license. SkipQ saved me 5 hours of standing in the sun.",
        author: "Thabo M.",
        location: "Johannesburg",
        rating: 5,
    },
    {
        text: "My runner was at Home Affairs at 5 AM. I only arrived at 11 AM when I was next in line. Absolute game changer.",
        author: "Sarah J.",
        location: "Cape Town",
        rating: 5,
    },
    {
        text: "Booked a runner for the community clinic. Kept me updated on WhatsApp the whole time. Very professional.",
        author: "Lerato K.",
        location: "Pretoria",
        rating: 5,
    },
]

export function Testimonials() {
    return (
        <section className="bg-slate-50/50">
            <PageContainer>
                <SectionHeader title="Loved by busy South Africans" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <SurfaceCard key={index} className="flex flex-col justify-between">
                            <div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="italic text-muted-foreground mb-6">&quot;{testimonial.text}&quot;</p>
                            </div>
                            <div>
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                            </div>
                        </SurfaceCard>
                    ))}
                </div>
            </PageContainer>
        </section>
    )
}
