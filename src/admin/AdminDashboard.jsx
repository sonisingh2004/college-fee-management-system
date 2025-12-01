import { Link } from "react-router-dom";

export function AdminDashboard() {
const stats = [
{ id: 1, title: "Total Students", value: 320 },
{ id: 2, title: "Fees Collected", value: "₹12,40,000" },
{ id: 3, title: "Pending", value: 23 },
];


return (
<div>
<h2 className="text-2xl font-bold mb-4">Dashboard</h2>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
{stats.map((s) => (
<div key={s.id} className="bg-white p-6 rounded-2xl shadow">
<div className="text-sm text-gray-500">{s.title}</div>
<div className="text-2xl font-bold mt-2">{s.value}</div>
</div>
))}
</div>


<div className="grid md:grid-cols-2 gap-6">
<div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold mb-2">Recent Payments</h3>
<table className="w-full text-left text-sm">
<thead>
<tr className="border-b">
<th className="py-2">Student</th>
<th>Amount</th>
<th>Date</th>
</tr>
</thead>
<tbody>
<tr className="border-b">
<td className="py-2">Rahul Singh</td>
<td>₹20,000</td>
<td>20 Nov 2025</td>
</tr>
<tr className="border-b">
<td className="py-2">Priya Patel</td>
<td>₹20,000</td>
<td>18 Nov 2025</td>
</tr>
</tbody>
</table>
</div>


<div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold mb-2">Quick Actions</h3>
<div className="flex flex-col gap-3">
<Link to="/admin/students/add" className="px-4 py-2 bg-blue-600 text-white rounded-lg w-max">Add Student</Link>
<Link to="/admin/fees" className="px-4 py-2 border rounded-lg w-max">Manage Fees</Link>
</div>
</div>
</div>
</div>
);
}


export default AdminDashboard;