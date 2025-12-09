// @ts-nocheck
import { useEffect, useState } from "react";
import { AuthService } from "../auth/AuthService";

export default function StudentProfile() {
  const user = AuthService.getUser();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const loggedInStudent = students.find((s) => s.id === user.id);
    setStudent(loggedInStudent);
  }, [user.id]);

  if (!student) {
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-white p-6 rounded-2xl shadow max-w-2xl space-y-5">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={student.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border shadow"
          />
          <h3 className="text-xl font-semibold mt-3">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.email}</p>
        </div>

        <hr />

        {/* BASIC INFO */}
        <div>
          <label className="text-sm text-gray-500">Full Name</label>
          <div className="font-medium text-lg">{student.name}</div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <div className="font-medium">{student.email}</div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Roll Number</label>
          <div className="font-medium">{student.roll}</div>
        </div>

        {/* COURSE / BRANCH / YEAR */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Course</label>
            <div className="font-medium">{student.course}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Branch</label>
            <div className="font-medium">{student.branch}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Year / Semester</label>
            <div className="font-medium">{student.year}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <div>
              {student.status === "active" ? (
                <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div>
          <label className="text-sm text-gray-500">Phone Number</label>
          <div className="font-medium">{student.phone}</div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Gender</label>
          <div className="font-medium">{student.gender}</div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Address</label>
          <div className="font-medium">{student.address}</div>
        </div>

        {/* PARENT DETAILS */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Parent Name</label>
            <div className="font-medium">{student.parentName}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Parent Contact</label>
            <div className="font-medium">{student.parentPhone}</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-700">
          This information is added by the Admin.  
          You cannot edit it yourself.
        </div>
      </div>
    </div>
  );
}
