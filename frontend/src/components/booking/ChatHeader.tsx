import { ArrowLeft, MoreVertical } from "lucide-react"
import Link from "next/link"

interface ChatHeaderProps {
    runnerName: string;
    runnerAvatar?: string;
    isActive?: boolean;
}

export function ChatHeader({ runnerName, runnerAvatar, isActive = true }: ChatHeaderProps) {
    return (
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Link
                    href="/book/tracker"
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-700 -ml-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>

                <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                        {runnerAvatar
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={runnerAvatar} alt={runnerName} className="h-full w-full object-cover" />
                            : <span className="font-bold text-slate-500">{runnerName.charAt(0)}</span>
                        }
                    </div>
                    {isActive && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-[#80f20d] border-2 border-white rounded-full" />
                    )}
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-base leading-tight">{runnerName}</span>
                    <span className="text-xs text-muted-foreground">{isActive ? "Active now" : "Offline"}</span>
                </div>
            </div>

            <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-700 -mr-2">
                <MoreVertical className="h-5 w-5" />
            </button>
        </div>
    )
}
