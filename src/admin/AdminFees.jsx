import { useState } from "react";

export function AdminFees() {
const [fees] = useState([
{ id: 1, student: "Rahul Singh", amount: 20000, status: "Paid" },
{ id: 2, student: "Priya Patel", amount: 20000, status: "Pending" },
]);


return (
<div>
<h2 className="text-2xl font-bold mb-4">Fees</h2>
<div className="bg-white p-4 rounded-2xl shadow">
<table className="w-full text-left text-sm">
<thead>
<tr className="border-b">
<th className="py-3">Student</th>
<th>Amount</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{fees.map((f) => (
<tr key={f.id} className="border-b">
<td className="py-3">{f.student}</td>
<td>₹{f.amount.toLocaleString()}</td>
<td className={f.status === "Paid" ? "text-green-600" : "text-red-600"}>{f.status}</td>
<td><button className="text-sm text-blue-600">View</button></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}


export default AdminFees;