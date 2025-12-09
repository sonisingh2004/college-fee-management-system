// @ts-nocheck
import { useEffect, useState } from "react";

export function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Get all fees from localStorage
    const allFees = JSON.parse(localStorage.getItem("fees")) || [];

    // Only show paid fees
    const paid = allFees
      .filter((f) => f.status === "Paid")
      .map((f) => ({
        id: f.id,
        student: f.student,
        amount: f.amount,
        date: f.dueDate || "—", // due date used as payment date since no payment timestamp
      }))
      .reverse(); // newest first

    setTransactions(paid);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="bg-white p-4 rounded-2xl shadow">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No transactions yet.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Student</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="py-3">{t.student}</td>
                  <td>₹{t.amount.toLocaleString()}</td>
                  <td>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminTransactions;
