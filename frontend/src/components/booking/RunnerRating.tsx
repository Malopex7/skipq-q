"use client"

import { Star, Loader2, CheckCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

export function RunnerRating({ jobId }: { jobId: string }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async () => {
        if (!rating) return
        try {
            setSubmitting(true)
            await api.patch(`/api/jobs/${jobId}/rate`, { rating, comment })
            setSubmitted(true)
        } catch (err) {
            console.error(err)
            alert("Failed to submit rating")
        } finally {
            setSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-[#80f20d]/10 rounded-2xl w-full mb-8">
                <CheckCircle className="h-8 w-8 text-[#72db0c] mb-2" />
                <p className="font-semibold text-slate-800">Rating Submitted</p>
                <p className="text-sm text-slate-500">Thank you for your feedback!</p>
            </div>
        )
    }

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
            <div className="w-full flex flex-col gap-3">
                <textarea
                    placeholder="Add an optional comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] transition-all"
                />

                <button
                    onClick={handleSubmit}
                    disabled={!rating || submitting}
                    className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center disabled:opacity-50"
                >
                    {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Feedback"}
                </button>
            </div>
        </div>
    )
}
