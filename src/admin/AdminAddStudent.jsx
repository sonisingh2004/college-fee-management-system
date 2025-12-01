import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminAddStudent() {
const navigate = useNavigate();
const [form, setForm] = useState({ name: "", dept: "CSE" });


function handleSubmit(e) {
e.preventDefault();
// TODO: connect to service
navigate("/admin/students");
}


return (
<div>
<h2 className="text-2xl font-bold mb-4">Add Student</h2>
<form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow max-w-xl">
<div className="mb-4">
<label className="block text-sm font-medium">Name</label>
<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border p-3 rounded-lg mt-1" />
</div>


<div className="mb-4">
<label className="block text-sm font-medium">Department</label>
<select value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} className="w-full border p-3 rounded-lg mt-1">
<option>CSE</option>
<option>ECE</option>
<option>ME</option>
<option>Civil</option>
</select>
</div>


<button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add</button>
</form>
</div>
);
}


export default AdminAddStudent;