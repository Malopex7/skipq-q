import { AppHeader } from "@/components/layout/AppHeader"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { QueueCategoryGrid } from "@/components/sections/QueueCategoryGrid"
import { Testimonials } from "@/components/sections/Testimonials"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <QueueCategoryGrid />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
