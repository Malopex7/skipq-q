export function EarningsChart() {
    const days = [
        { label: "M", amount: 150 },
        { label: "T", amount: 320 },
        { label: "W", amount: 210 },
        { label: "T", amount: 480 },
        { label: "F", amount: 390 },
        { label: "S", amount: 650 },
        { label: "S", amount: 250 },
    ]

    const maxAmount = Math.max(...days.map(d => d.amount))

    return (
        <div className="bg-white border text-center border-slate-100 shadow-sm rounded-[2rem] p-6 w-full mb-8">
            <div className="flex justify-between items-end h-40 gap-2 mb-4">
                {days.map((day, i) => {
                    const heightPercent = `${(day.amount / maxAmount) * 100}%`
                    const isHighest = day.amount === maxAmount

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
