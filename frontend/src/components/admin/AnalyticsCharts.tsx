// Pure SVG-based charts — no external chart library needed

const REVENUE_DATA = [42, 58, 35, 70, 55, 80, 65, 90, 72, 96, 84, 110, 88, 120, 95, 130, 105, 118, 99, 140, 115, 128, 108, 145, 125, 138, 118, 152, 130, 160]
const CATEGORIES = [
    { name: "Home Affairs", jobs: 520 },
    { name: "Vehicle License", jobs: 380 },
    { name: "Bank Queue", jobs: 210 },
    { name: "Clinic/Hospital", jobs: 155 },
    { name: "SARS/Tax", jobs: 77 },
]

export function RevenueChart() {
    const max = Math.max(...REVENUE_DATA)
    const w = 600
    const h = 160
    const pad = 20
    const points = REVENUE_DATA.map((v, i) => {
        const x = pad + (i / (REVENUE_DATA.length - 1)) * (w - pad * 2)
        const y = h - pad - ((v / max) * (h - pad * 2))
        return `${x},${y}`
    }).join(" ")

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Revenue — Last 30 Days</h3>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#80f20d" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#80f20d" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Fill area */}
                <polygon
                    points={`${pad},${h - pad} ${points} ${w - pad},${h - pad}`}
                    fill="url(#revGrad)"
                />
                {/* Line */}
                <polyline points={points} fill="none" stroke="#80f20d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export function JobsByCategoryChart() {
    const maxJobs = Math.max(...CATEGORIES.map(c => c.jobs))
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Jobs by Category</h3>
            <div className="space-y-3">
                {CATEGORIES.map(cat => (
                    <div key={cat.name} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-600 w-36 shrink-0 truncate">{cat.name}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[#80f20d] transition-all duration-500"
                                style={{ width: `${(cat.jobs / maxJobs) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-10 text-right shrink-0">{cat.jobs}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
