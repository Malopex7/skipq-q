import { CheckCircle2, Clock } from "lucide-react"

interface PayoutItem {
    id: string;
    date: string;
    jobCount: number;
    amount: string;
    status: "processed" | "pending";
}

export function PayoutList() {
    const payouts: PayoutItem[] = [
        { id: "1", date: "Oct 24, 2023", jobCount: 12, amount: "R 1,450.00", status: "processed" },
        { id: "2", date: "Oct 17, 2023", jobCount: 8, amount: "R 980.00", status: "processed" },
        { id: "3", date: "Oct 10, 2023", jobCount: 4, amount: "R 420.00", status: "pending" },
    ]

    return (
        <div className="w-full">
            <h3 className="text-base font-bold text-slate-900 mb-4 px-1">Recent Payouts</h3>
            <div className="flex flex-col gap-3">
                {payouts.map((payout) => (
                    <div key={payout.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                        <div>
                            <p className="font-bold text-slate-900 text-sm mb-1">{payout.date}</p>
                            <p className="text-xs font-medium text-slate-500">{payout.jobCount} Jobs Completed</p>
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                            <span className="font-bold text-slate-900">{payout.amount}</span>
                            {payout.status === "processed" ? (
                                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-md">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Processed</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md">
                                    <Clock className="h-3 w-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Pending</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
