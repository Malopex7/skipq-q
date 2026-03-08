import { SectionHeader } from "@/components/ui/SectionHeader"
import { PageContainer } from "@/components/ui/PageContainer"
import { SurfaceCard } from "@/components/ui/SurfaceCard"
import { Building2, Stethoscope, Car, ShoppingCart, Landmark, Mail } from "lucide-react"

const CATEGORIES = [
    { name: "Home Affairs", icon: Building2, wait: "3-8 hours" },
    { name: "Licensing Dept", icon: Car, wait: "2-6 hours" },
    { name: "Public Clinics", icon: Stethoscope, wait: "4-10 hours" },
    { name: "Banks", icon: Landmark, wait: "1-3 hours" },
    { name: "Grocery Stores", icon: ShoppingCart, wait: "30m-2h" },
    { name: "Post Office", icon: Mail, wait: "1-2 hours" },
]

export function QueueCategoryGrid() {
    return (
        <section id="services" className="bg-background">
            <PageContainer>
                <SectionHeader
                    title="We wait where you won't"
                    subtitle="Our runners are ready to stand in line at these locations and more."
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-12">
                    {CATEGORIES.map((category, index) => (
                        <SurfaceCard
                            key={index}
                            className="flex flex-col items-center justify-center text-center p-6 hover:border-primary/50 transition-colors cursor-pointer group"
                        >
                            <div className="bg-slate-100 group-hover:bg-primary/10 transition-colors rounded-full p-4 mb-4">
                                <category.icon className="h-6 w-6 text-slate-700 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                            <p className="text-xs text-muted-foreground hidden md:block">Est: {category.wait}</p>
                        </SurfaceCard>
                    ))}
                </div>
            </PageContainer>
        </section>
    )
}
