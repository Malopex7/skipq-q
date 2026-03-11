"use client"

import { PageHeader } from "@/components/ui/PageHeader"
import { MessageSquareOff } from "lucide-react"

export default function ClientMessagesPage() {
    return (
        <div className="flex justify-center bg-slate-100 min-h-[100dvh]">
            <div className="w-full max-w-md bg-slate-50 border-x min-h-[100dvh] flex flex-col relative pb-28">

                <PageHeader
                    title="Messages"
                    subtitle="Chats with your runners"
                    backHref="/dashboard"
                    className="bg-white"
                />

                <main className="flex-1 px-6 py-4 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <MessageSquareOff className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No Messages Yet</h3>
                    <p className="text-sm text-slate-500 max-w-[200px]">
                        When a runner accepts your job, you can chat with them here.
                    </p>
                </main>


            </div>
        </div>
    )
}
