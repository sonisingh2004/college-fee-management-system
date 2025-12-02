import { useState } from "react";

function StudentPayments() {
const [payments] = useState([
{ id: 1, desc: "Tuition Fee - Sem 1", amount: 20000, date: "2025-11-20", status: "Paid" },
{ id: 2, desc: "Hostel Fee", amount: 15000, date: "2025-10-10", status: "Pending" },
]);

// @ts-ignore
function payNow(id) {
alert("Simulated payment for transaction " + id + " (implement gateway later)");
}


return (
<div>
<h2 className="text-2xl font-bold mb-4">Payments</h2>


<div className="bg-white p-4 rounded-2xl shadow">
<table className="w-full text-left text-sm">
<thead>
<tr className="border-b">
<th className="py-2">Description</th>
<th>Amount</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{payments.map((p) => (
<tr key={p.id} className="border-b">
<td className="py-2">{p.desc}</td>
<td>₹{p.amount.toLocaleString()}</td>
<td>{p.date}</td>
<td className={p.status === "Paid" ? "text-green-600" : "text-red-600"}>{p.status}</td>
<td>
{p.status !== "Paid" && (
<button onClick={() => payNow(p.id)} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Pay Now</button>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}


export default  StudentPayments ;