// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

 useEffect(() => {
  const data = JSON.parse(localStorage.getItem("students")) || [];
  setStudents(data);
  setFiltered(data);
}, [localStorage.getItem("students")]);

  // Search + Filters
  useEffect(() => {
    let result = students;

    if (search.trim() !== "") {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase()) ||
          s.roll.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (courseFilter !== "") {
      result = result.filter((s) => s.course === courseFilter);
    }

    setFiltered(result);
  }, [search, courseFilter, students]);

  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    setFiltered(updated);
    localStorage.setItem("students", JSON.stringify(updated));

    alert("Student deleted successfully!");
  }

  const uniqueCourses = [...new Set(students.map((s) => s.course))];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      {/* Search + Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow mb-4">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name, email, or roll"
            className="border p-2 rounded-lg w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg w-full"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">Filter by Course</option>
            {uniqueCourses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCourseFilter("");
            }}
            className="bg-gray-100 border p-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Course</th>
              <th>Status</th>   {/* ⭐ NEW COLUMN */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}

            {filtered.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-3">{s.name}</td>
                <td>{s.email}</td>
                <td>{s.roll}</td>
                <td>{s.course}</td>

                {/* ⭐ STATUS BADGE */}
                <td>
                  {s.status === "active" ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="flex gap-3 py-3">
                  <Link
                    to={`/admin/students/edit/${s.id}`}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
