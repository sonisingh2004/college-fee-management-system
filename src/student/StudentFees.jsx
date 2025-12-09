// @ts-nocheck
import { useEffect, useState } from "react";
import { AuthService } from "../auth/AuthService";

export default function StudentFees() {
  const [fees, setFees] = useState([]);
  const user = AuthService.getUser();

  useEffect(() => {
    const allFees = JSON.parse(localStorage.getItem("fees")) || [];

    // Only fetch fees for logged-in student
    const studentFees = allFees.filter((f) => f.studentId === user.id);

    setFees(studentFees);
  }, [user.id]);

  // SUMMARIES
  const totalFee = fees.reduce((sum, f) => sum + f.amount, 0);
  const paid = fees
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + f.amount, 0);
  const pending = totalFee - paid;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Fee Details</h2>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Total Fee</div>
          <div className="text-2xl font-bold mt-2">₹{totalFee.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Paid</div>
          <div className="text-2xl font-bold mt-2 text-green-600">
            ₹{paid.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold mt-2 text-red-600">
            ₹{pending.toLocaleString()}
          </div>
        </div>
      </div>

      {/* FEE BREAKDOWN */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Fee Breakdown</h3>

        {fees.length === 0 ? (
          <p className="text-gray-500">No fees assigned yet.</p>
        ) : (
          <div className="space-y-3">
            {fees.map((fee) => (
              <div key={fee.id} className="flex justify-between border-b pb-2">
                <span>{fee.title}</span>
                <span className="font-medium">₹{fee.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAYMENT HISTORY */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-3">Payment History</h3>

        {fees.length === 0 ? (
          <p className="text-gray-500">No payment records available.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-2">{t.title}</td>
                  <td>₹{t.amount.toLocaleString()}</td>
                  <td>{t.dueDate || "--"}</td>

                  <td
                    className={
                      t.status === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {t.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
