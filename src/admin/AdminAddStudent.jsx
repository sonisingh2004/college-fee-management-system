// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";

export function AdminAddStudent() {
const navigate = useNavigate();
const [form, setForm] = useState({
name: "",
email: "",
password: "",
phone: "",
roll: "",
dept: "CSE",
semester: "1",
section: "A",
dob: "",
address: "",
profileImage: ""
});
const [message, setMessage] = useState("");
const [error, setError] = useState("");


function handleSubmit(e) {
e.preventDefault();
setError("");
setMessage("");

// Validate required fields
if (!form.name || !form.email || !form.password || !form.roll) {
setError("Please fill in all required fields");
return;
}

// Register student using AuthService
const result = AuthService.registerStudent(form);

if (!result.success) {
setError(result.message || "Failed to add student");
return;
}

setMessage("Student added successfully!");
setTimeout(() => navigate("/admin/students"), 1500);
}


return (
<div>
<h2 className="text-2xl font-bold mb-4">Add Student</h2>
<form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow max-w-2xl">
{message && <div className="text-green-600 text-sm mb-4">{message}</div>}
{error && <div className="text-red-600 text-sm mb-4">{error}</div>}

<div className="grid grid-cols-2 gap-4">
<div className="mb-4">
<label className="block text-sm font-medium">Name *</label>
<input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border p-3 rounded-lg mt-1" required />
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Email *</label>
<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border p-3 rounded-lg mt-1" required />
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Password *</label>
<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border p-3 rounded-lg mt-1" required />
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Phone</label>
<input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border p-3 rounded-lg mt-1" />
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Roll Number *</label>
<input type="text" value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} className="w-full border p-3 rounded-lg mt-1" required />
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Department *</label>
<select value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} className="w-full border p-3 rounded-lg mt-1">
<option>CSE</option>
<option>CSE-AI</option>
<option>ECE</option>
<option>EEE</option>
<option>Civil</option>
<option>Mechanical</option>
</select>
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Semester *</label>
<select value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className="w-full border p-3 rounded-lg mt-1">
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
</select>
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Section *</label>
<select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full border p-3 rounded-lg mt-1">
<option>Genius</option>
<option>Brilliant</option>
<option>Smart</option>
</select>
</div>

<div className="mb-4">
<label className="block text-sm font-medium">Date of Birth</label>
<input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="w-full border p-3 rounded-lg mt-1" />
</div>

<div className="mb-4 col-span-2">
<label className="block text-sm font-medium">Address</label>
<textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border p-3 rounded-lg mt-1" rows="2"></textarea>
</div>

<div className="mb-4 col-span-2">
<label className="block text-sm font-medium">Profile Image URL</label>
<input type="text" value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })} className="w-full border p-3 rounded-lg mt-1" placeholder="https://example.com/image.jpg" />
</div>
</div>

<button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Add Student</button>
</form>
</div>
);
}


export default AdminAddStudent;