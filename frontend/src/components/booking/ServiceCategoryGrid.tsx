"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CategoryCard } from "./CategoryCard"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

interface ServiceCategory {
    _id: string
    name: string
    icon: string
    basePrice: number
    isActive: boolean
}

export function ServiceCategoryGrid() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [categories, setCategories] = useState<ServiceCategory[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get<ServiceCategory[]>("/api/services")
            .then(data => setCategories(data.filter(c => c.isActive)))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleContinue = () => {
        if (selectedId) {
            // Pass the service ID in the URL to the next step
            router.push(`/book/location?service=${selectedId}`)
        }
    }

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Search Filter */}
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Search className="h-5 w-5" />
                </div>
                <Input
                    type="search"
                    placeholder="Search for a queue..."
                    className="pl-10 rounded-xl h-12 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                {loading
                    ? [...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center gap-3 animate-pulse h-32">
                            <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                            <div className="h-4 w-24 bg-slate-100 rounded" />
                        </div>
                    ))
                    : filteredCategories.map((category) => (
                        <CategoryCard
                            key={category._id}
                            name={category.name}
                            icon={category.icon}
                            waitTime={`Starts at R${category.basePrice}`}
                            isSelected={selectedId === category._id}
                            onClick={() => setSelectedId(category._id)}
                        />
                    ))
                }
            </div>

            {/* Continue Action */}
            <div className="fixed bottom-[72px] left-0 right-0 p-6 bg-gradient-to-t from-background to-background/0 pointer-events-none">
                <button
                    disabled={!selectedId}
                    onClick={handleContinue}
                    className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-xl mt-4 pointer-events-auto shadow-lg disabled:opacity-50 transition-opacity"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
