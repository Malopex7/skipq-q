"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CategoryCard } from "./CategoryCard"
import {
    Building2,
    Car,
    Stethoscope,
    Landmark,
    ShoppingCart,
    LandPlot,
    CreditCard,
    Mail
} from "lucide-react"

const CATEGORIES = [
    { id: "home-affairs", name: "Home Affairs", icon: Building2, waitTime: "3-8 hours" },
    { id: "traffic", name: "Traffic/Licensing", icon: Car, waitTime: "2-6 hours" },
    { id: "clinic", name: "Clinic/Hospital", icon: Stethoscope, waitTime: "4-10 hours" },
    { id: "bank", name: "Bank", icon: Landmark, waitTime: "1-3 hours" },
    { id: "grocery", name: "Grocery Shopping", icon: ShoppingCart, waitTime: "30m-2h" },
    { id: "municipal", name: "Municipal Office", icon: LandPlot, waitTime: "2-4 hours" },
    { id: "sassa", name: "SASSA", icon: CreditCard, waitTime: "4-8 hours" },
    { id: "post-office", name: "Post Office", icon: Mail, waitTime: "1-2 hours" },
]

export function ServiceCategoryGrid() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const filteredCategories = CATEGORIES.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                {filteredCategories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        icon={category.icon}
                        waitTime={category.waitTime}
                        isSelected={selectedId === category.id}
                        onClick={() => setSelectedId(category.id)}
                    />
                ))}
            </div>

            {/* Mock Next Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-background/0 pointer-events-none">
                <button
                    disabled={!selectedId}
                    className="w-full h-14 bg-primary text-primary-foreground font-semibold rounded-xl mt-4 pointer-events-auto shadow-lg disabled:opacity-50 transition-opacity"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
