import { useEffect, useState } from "react";
import { AuthService } from "../auth/AuthService";

function StudentProfile() {
const [student, setStudent] = useState({
name: "Student Name",
roll: "N/A",
dept: "N/A",
email: "student@college.edu",
phone: "N/A",
semester: "N/A",
section: "N/A",
gpa: "N/A",
enrollmentDate: "N/A",
profileImage: "/logo192.png"
});

useEffect(() => {
const user = AuthService.getUser();
if (user) {
setStudent({
name: user.name || "Student Name",
roll: "12345", // You can fetch this from a database
dept: "CSE", // You can fetch this from a database
email: user.email || "student@college.edu",
phone: "9876543210", // You can fetch this from a database
semester: "7", // You can fetch this from a database
section: "Genius", // You can fetch this from a database
gpa: "8.8", // You can fetch this from a database
enrollmentDate: "2022-12-15", // You can fetch this from a database
profileImage: user.profileImage || "/logo192.png" // Fetch from backend
});
}
}, []);

return (
<div>
<h2 className="text-2xl font-bold mb-4">Profile</h2>
<div className="bg-white p-6 rounded-2xl shadow">
<div className="flex items-center gap-6 mb-6 pb-6 border-b">
<img src={student.profileImage} alt="profile" className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover" />
<div>
<h3 className="text-xl font-bold">{student.name}</h3>
<p className="text-gray-500 text-sm">Roll: {student.roll}</p>
<p className="text-gray-500 text-sm">{student.dept} - Semester {student.semester}</p>
</div>
</div>
<div className="grid grid-cols-2 gap-6">
<div><div className="text-sm text-gray-500">Name</div><div className="font-medium">{student.name}</div></div>
<div><div className="text-sm text-gray-500">Roll Number</div><div className="font-medium">{student.roll}</div></div>
<div><div className="text-sm text-gray-500">Department</div><div className="font-medium">{student.dept}</div></div>
<div><div className="text-sm text-gray-500">Email</div><div className="font-medium">{student.email}</div></div>
<div><div className="text-sm text-gray-500">Phone</div><div className="font-medium">{student.phone}</div></div>
<div><div className="text-sm text-gray-500">Current Semester</div><div className="font-medium">{student.semester}</div></div>
<div><div className="text-sm text-gray-500">Section</div><div className="font-medium">{student.section}</div></div>
<div><div className="text-sm text-gray-500">GPA</div><div className="font-medium">{student.gpa}</div></div>
<div><div className="text-sm text-gray-500">Enrollment Date</div><div className="font-medium">{student.enrollmentDate}</div></div>
</div>
</div>
</div>
);
}
export default StudentProfile