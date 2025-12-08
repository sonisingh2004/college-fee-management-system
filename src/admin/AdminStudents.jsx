// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminStudents() {
const [students, setStudents] = useState([]);

useEffect(() => {
// Fetch students from AuthService
const allStudents = JSON.parse(localStorage.getItem("students")) || [];
setStudents(allStudents.map((s, index) => ({
...s,
id: index + 1,
status: "Pending" // Default status
})));
}, []);


function deleteStudent(id) {
setStudents((s) => s.filter((st) => st.id !== id));
// Also update localStorage
const updatedStudents = students.filter(st => st.id !== id);
const studentsForStorage = updatedStudents.map(({ id, ...rest }) => rest);
localStorage.setItem("students", JSON.stringify(studentsForStorage));
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
<th>Roll Number</th>
<th>Department</th>
<th>Email</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{students.length > 0 ? (
students.map((s) => (
<tr key={s.id} className="border-b">
<td className="py-3">{s.name}</td>
<td>{s.roll}</td>
<td>{s.dept}</td>
<td>{s.email}</td>
<td>
<button onClick={() => deleteStudent(s.id)} className="text-sm text-red-600 hover:underline">Delete</button>
</td>
</tr>
))
) : (
<tr>
<td colSpan="5" className="py-4 text-center text-gray-500">No students added yet</td>
</tr>
)}
</tbody>
</table>
</div>
</div>
);
}


export default AdminStudents;