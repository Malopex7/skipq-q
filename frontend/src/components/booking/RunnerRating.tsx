"use client"

import { Star } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function RunnerRating() {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")

    return (
        <div className="flex flex-col items-center w-full mb-8 px-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Rate your runner</h3>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            className={cn(
                                "h-10 w-10 transition-colors",
                                (hover || rating) >= star
                                    ? "fill-[#ffc107] text-[#ffc107]"
                                    : "fill-slate-100 text-slate-300"
                            )}
                        />
                    </button>
                ))}
            </div>

            {/* Optional Comment */}
            <div className="w-full">
                <textarea
                    placeholder="Add an optional comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] transition-all"
                />
            </div>
        </div>
    )
}
