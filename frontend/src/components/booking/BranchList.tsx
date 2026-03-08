"use client"

import { useState } from "react"
import { Search, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BranchCard } from "./BranchCard"
import { Button } from "@/components/ui/button"

type Urgency = "low" | "moderate" | "high"

const MOCK_BRANCHES = [
    { id: "1", name: "Randburg Home Affairs", area: "Gauteng", distance: "4.2 km away", waitTime: "High - 4h+", urgency: "high" as Urgency },
    { id: "2", name: "Roodepoort Home Affairs", area: "Gauteng", distance: "8.1 km away", waitTime: "Moderate - 2h", urgency: "moderate" as Urgency },
    { id: "3", name: "Edenvale Home Affairs", area: "Gauteng", distance: "12 km away", waitTime: "Low - 45m", urgency: "low" as Urgency },
    { id: "4", name: "Johannesburg Central", area: "Gauteng", distance: "15 km away", waitTime: "High - 5h+", urgency: "high" as Urgency },
]

export function BranchList() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredBranches = MOCK_BRANCHES.filter(branch =>
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.area.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSelect = (id: string) => {
        // Navigate to C5 Booking Detail screen later
        console.log("Selected branch", id)
    }

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                        <Search className="h-5 w-5" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search city, area or branch..."
                        className="pl-10 rounded-xl h-12 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Use Location Button */}
                <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-primary text-primary flex items-center justify-center gap-2 hover:bg-primary/5"
                >
                    <Navigation className="h-4 w-4" />
                    Use my current location
                </Button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
                {filteredBranches.map((branch) => (
                    <BranchCard
                        key={branch.id}
                        name={branch.name}
                        area={branch.area}
                        distance={branch.distance}
                        waitTime={branch.waitTime}
                        urgency={branch.urgency}
                        onSelect={() => handleSelect(branch.id)}
                    />
                ))}

                {filteredBranches.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">
                        No branches found matching &quot;{searchQuery}&quot;
                    </div>
                )}
            </div>
        </div>
    )
}
