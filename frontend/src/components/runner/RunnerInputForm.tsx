import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RunnerInputForm() {
    return (
        <form className="flex flex-col gap-6 w-full">
            <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700 ml-1">
                    Full Name
                </Label>
                <Input
                    id="fullName"
                    placeholder="e.g. Sipho Mokoena"
                    className="h-14 rounded-xl border-slate-200 bg-white text-base px-4 focus-visible:ring-primary shadow-sm"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 ml-1">
                    Phone Number
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 082 123 4567"
                    className="h-14 rounded-xl border-slate-200 bg-white text-base px-4 focus-visible:ring-primary shadow-sm"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-sm font-semibold text-slate-700 ml-1">
                    South African ID Number
                </Label>
                <Input
                    id="idNumber"
                    placeholder="13-digit ID number"
                    maxLength={13}
                    className="h-14 rounded-xl border-slate-200 bg-white text-base px-4 focus-visible:ring-primary shadow-sm"
                />
                <p className="text-xs text-muted-foreground ml-1 mt-1">
                    Used to verify your identity before you can start running queues.
                </p>
            </div>
        </form>
    )
}
