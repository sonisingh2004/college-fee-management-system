// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../auth/AuthService";

export default function StudentDashboard() {
  const [fees, setFees] = useState([]);
  const user = AuthService.getUser(); // { role: 'student', id: 123 }

  useEffect(() => {
    const allFees = JSON.parse(localStorage.getItem("fees")) || [];

    // filter fees only for this student
    const studentFees = allFees.filter(f => f.studentId === user.id);

    setFees(studentFees);
  }, []);

  const totalFee = fees.reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = fees
    .filter(f => f.status === "Paid")
    .reduce((sum, f) => sum + f.amount, 0);
  const totalPending = totalFee - totalPaid;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h2>

      {/* Summary cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Fees</p>
          <p className="text-2xl font-bold mt-2">₹{totalFee.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Paid Amount</p>
          <p className="text-2xl font-bold mt-2 text-green-600">
            ₹{totalPaid.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Pending Amount</p>
          <p className="text-2xl font-bold mt-2 text-red-600">
            ₹{totalPending.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Fee Notifications */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Fee Notices</h3>
          <Link to="/student/fees" className="text-blue-600 text-sm">
            View All
          </Link>
        </div>

        {fees.length === 0 ? (
          <p className="text-gray-500">No fees assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {fees.slice(0, 3).map(fee => (
              <div
                key={fee.id}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{fee.title}</p>
                  <p className="text-gray-600 text-sm">
                    Due: {fee.dueDate || "N/A"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    fee.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {fee.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
