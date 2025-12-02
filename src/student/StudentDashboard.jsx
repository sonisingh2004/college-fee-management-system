function StudentDashboard() {
const dues = 15000;
const lastPayment = { amount: 20000, date: "2025-11-20" };


return (
<div>
<h2 className="text-2xl font-bold mb-4">Welcome, Student</h2>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
<div className="bg-white p-6 rounded-2xl shadow">
<div className="text-sm text-gray-500">Due Amount</div>
<div className="text-2xl font-bold mt-2">₹{dues.toLocaleString()}</div>
</div>
<div className="bg-white p-6 rounded-2xl shadow">
<div className="text-sm text-gray-500">Last Payment</div>
<div className="text-2xl font-bold mt-2">₹{lastPayment.amount.toLocaleString()}</div>
<div className="text-sm text-gray-500 mt-1">{lastPayment.date}</div>
</div>
<div className="bg-white p-6 rounded-2xl shadow">
<div className="text-sm text-gray-500">Status</div>
<div className="text-2xl font-bold mt-2 text-green-600">Active</div>
</div>
</div>


<div className="bg-white p-6 rounded-2xl shadow">
<h3 className="font-semibold mb-2">Recent Transactions</h3>
<table className="w-full text-left text-sm">
<thead>
<tr className="border-b">
<th className="py-2">Description</th>
<th>Amount</th>
<th>Date</th>
</tr>
</thead>
<tbody>
<tr className="border-b">
<td className="py-2">Tuition Fee - Semester 1</td>
<td>₹20,000</td>
<td>20 Nov 2025</td>
</tr>
<tr>
<td className="py-2">Library Fee</td>
<td>₹1,000</td>
<td>12 Nov 2025</td>
</tr>
</tbody>
</table>
</div>
</div>
);
}


export default StudentDashboard;