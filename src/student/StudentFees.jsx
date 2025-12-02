
export default function StudentFees() {

  const feeDetails = {
    totalFee: 60000,
    paid: 45000,
    pending: 15000,
    breakdown: [
      { title: "Tuition Fee", amount: 30000 },
      { title: "Hostel Fee", amount: 20000 },
      { title: "Library Fee", amount: 3000 },
      { title: "Bus Fee", amount: 7000 },
    ],
    transactions: [
      { id: 1, desc: "Tuition Fee", amount: 20000, date: "2025-11-20", status: "Paid" },
      { id: 2, desc: "Hostel Fee", amount: 15000, date: "2025-10-12", status: "Paid" },
      { id: 3, desc: "Library Fee", amount: 3000, date: "2025-09-05", status: "Pending" },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Fee Details</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Total Fee</div>
          <div className="text-2xl font-bold mt-2">₹{feeDetails.totalFee.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Paid</div>
          <div className="text-2xl font-bold mt-2 text-green-600">
            ₹{feeDetails.paid.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold mt-2 text-red-600">
            ₹{feeDetails.pending.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Fee Breakdown</h3>

        <div className="space-y-3">
          {feeDetails.breakdown.map((fee, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span>{fee.title}</span>
              <span className="font-medium">₹{fee.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-3">Payment History</h3>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {feeDetails.transactions.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="py-2">{t.desc}</td>
                <td>₹{t.amount.toLocaleString()}</td>
                <td>{t.date}</td>
                <td
                  className={
                    t.status === "Paid"
                      ? "text-green-600"
                      : t.status === "Pending"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
