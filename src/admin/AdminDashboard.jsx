// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("students")) || [];
    const f = JSON.parse(localStorage.getItem("fees")) || [];
    setStudents(s);
    setFees(f);
  }, []);

  // Total Fees Collected
  const totalCollected = fees
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + f.amount, 0);

  // Pending Fees Count
  const pendingCount = fees.filter((f) => f.status !== "Paid").length;

  // Recent 5 Payments
  const recentPayments = fees
    .filter((f) => f.status === "Paid")
    .slice(-5)
    .reverse();

  const stats = [
    { id: 1, title: "Total Students", value: students.length },
    { id: 2, title: "Fees Collected", value: `₹${totalCollected.toLocaleString()}` },
    { id: 3, title: "Pending Payments", value: pendingCount },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl shadow">
            <div className="text-sm text-gray-500">{s.title}</div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Recent Payments */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Recent Payments</h3>

          {recentPayments.length === 0 ? (
            <p className="text-gray-500 text-sm">No payments yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Student</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="py-2">{p.student}</td>
                    <td>₹{p.amount.toLocaleString()}</td>
                    <td>{p.dueDate || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-2">Quick Actions</h3>

          <div className="flex flex-col gap-3">
            <Link
              to="/admin/students/add"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg w-max"
            >
              Add Student
            </Link>

            <Link
              to="/admin/fees"
              className="px-4 py-2 border rounded-lg w-max"
            >
              Manage Fees
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
