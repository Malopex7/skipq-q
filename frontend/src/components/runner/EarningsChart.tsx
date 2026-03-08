export function EarningsChart({ customData }: { customData?: { _id: string, total: number }[] }) {
    // Map backend data or use empty week if none
    const days = [
        { label: "M", amount: 0 },
        { label: "T", amount: 0 },
        { label: "W", amount: 0 },
        { label: "T", amount: 0 },
        { label: "F", amount: 0 },
        { label: "S", amount: 0 },
        { label: "S", amount: 0 },
    ]

    if (customData && customData.length > 0) {
        // Simple mapping: _id is "YYYY-MM-DD", let's parse day of week
        customData.forEach(d => {
            const date = new Date(d._id)
            const dayIndex = date.getDay() // 0 is Sunday, 1 is Monday
            // Map JS Sunday (0) to our array end (6), and others down by 1
            const mapIndex = dayIndex === 0 ? 6 : dayIndex - 1
            if (mapIndex >= 0 && mapIndex < 7) {
                days[mapIndex].amount = d.total
            }
        })
    }

    // fallback to 1 to avoid divide by zero
    const maxAmount = Math.max(...days.map(d => d.amount), 1)

    return (
        <div className="bg-white border text-center border-slate-100 shadow-sm rounded-[2rem] p-6 w-full mb-8">
            <div className="flex justify-between items-end h-40 gap-2 mb-4">
                {days.map((day, i) => {
                    const heightPercent = `${(day.amount / maxAmount) * 100}%`
                    const isHighest = day.amount > 0 && day.amount === maxAmount

                    return (
                        <div key={i} className="flex flex-col items-center flex-1 gap-2 h-full justify-end">
                            <div
                                className={`w-full max-w-[32px] rounded-sm transition-all duration-500 ${isHighest ? 'bg-[#80f20d]' : 'bg-slate-200'}`}
                                style={{ height: heightPercent }}
                            />
                            <span className={`text-xs font-bold ${isHighest ? 'text-slate-900' : 'text-slate-400'}`}>
                                {day.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
