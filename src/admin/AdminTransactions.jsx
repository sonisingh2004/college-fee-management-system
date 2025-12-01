import { useState } from "react";

export function AdminTransactions() {
const [tx] = useState([
{ id: 1, student: "Rahul Singh", amount: 20000, date: "2025-11-20" },
{ id: 2, student: "Priya Patel", amount: 20000, date: "2025-11-18" },
]);


return (
<div>
<h2 className="text-2xl font-bold mb-4">Transactions</h2>
<div className="bg-white p-4 rounded-2xl shadow">
<table className="w-full text-left text-sm">
<thead>
<tr className="border-b">
<th className="py-3">Student</th>
<th>Amount</th>
<th>Date</th>
</tr>
</thead>
<tbody>
{tx.map((t) => (
<tr key={t.id} className="border-b">
<td className="py-3">{t.student}</td>
<td>₹{t.amount.toLocaleString()}</td>
<td>{t.date}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}


export default AdminTransactions;