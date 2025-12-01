import { useState } from "react";
import { Link } from "react-router-dom";

export function AdminStudents() {
const [students, setStudents] = useState([
{ id: 1, name: "Rahul Singh", dept: "CSE", status: "Paid" },
{ id: 2, name: "Priya Patel", dept: "ECE", status: "Pending" },
]);


function deleteStudent(id) {
setStudents((s) => s.filter((st) => st.id !== id));
}


return (
<div>
<div className="flex items-center justify-between mb-4">
<h2 className="text-2xl font-bold">Students</h2>
<Link to="/admin/students/add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Student</Link>
</div>


<div className="bg-white rounded-2xl shadow p-4">
<table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="py-3">Name</th>
<th>Department</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{students.map((s) => (
<tr key={s.id} className="border-b">
<td className="py-3">{s.name}</td>
<td>{s.dept}</td>
<td className={s.status === "Paid" ? "text-green-600" : "text-red-600"}>{s.status}</td>
<td>
<button onClick={() => deleteStudent(s.id)} className="text-sm text-red-600">Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}


export default AdminStudents;