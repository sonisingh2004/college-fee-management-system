// @ts-nocheck
import { useEffect, useState } from "react";

export function AdminFees() {
  const [students, setStudents] = useState([]);
  const [previewProof, setPreviewProof] = useState(null);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(savedStudents);
  }, []);

  const [fees, setFees] = useState(() => {
    const saved = localStorage.getItem("fees");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("fees", JSON.stringify(fees));
  }, [fees]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    dueDate: "",
    studentId: "all",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCreateFee(e) {
    e.preventDefault();
    const amountNumber = Number(form.amount);
    if (!form.title || !form.amount) return;

    let newFees = [];

    if (form.studentId === "all") {
      newFees = students.map((s) => ({
        id: Date.now() + "-" + s.id,
        studentId: s.id,
        student: s.name,
        title: form.title,
        amount: amountNumber,
        dueDate: form.dueDate,
        status: "Pending",
        proof: null,
      }));
    } else {
      const s = students.find((st) => st.id === Number(form.studentId));
      newFees = [
        {
          id: Date.now(),
          studentId: s.id,
          student: s.name,
          title: form.title,
          amount: amountNumber,
          dueDate: form.dueDate,
          status: "Pending",
          proof: null,
        },
      ];
    }

    setFees((prev) => [...prev, ...newFees]);
    setForm({ title: "", amount: "", dueDate: "", studentId: "all" });
    alert("Fee created successfully!");
  }

  function approvePayment(id) {
    const updated = fees.map((fee) =>
      fee.id === id ? { ...fee, status: "Paid" } : fee
    );
    setFees(updated);
    localStorage.setItem("fees", JSON.stringify(updated));
    alert("Payment Approved");
  }

  function rejectPayment(id) {
    const updated = fees.map((fee) =>
      fee.id === id ? { ...fee, status: "Pending", proof: null } : fee
    );
    setFees(updated);
    localStorage.setItem("fees", JSON.stringify(updated));
    alert("Payment Rejected");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Fees</h2>

      {/* CREATE FORM */}
      <form
        onSubmit={handleCreateFee}
        className="bg-white p-4 rounded-2xl shadow mb-6 space-y-4"
      >
        <h3 className="font-semibold text-lg">Create Fee Structure</h3>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">Fee Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Assign To</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            >
              <option value="all">All Students</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl">
          Create & Send
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th>Student</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Proof</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((f) => (
              <tr key={f.id} className="border-b">
                <td>{f.student}</td>
                <td>{f.title}</td>
                <td>₹{f.amount.toLocaleString()}</td>
                <td>{f.dueDate || "-"}</td>

                <td
                  className={
                    f.status === "Paid"
                      ? "text-green-600"
                      : f.status === "Verification Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {f.status}
                </td>

                <td>
                  {f.proof ? (
                    <button
                      onClick={() => setPreviewProof(f.proof)}
                      className="text-blue-600 underline"
                    >
                      View Proof
                    </button>
                  ) : (
                    "--"
                  )}
                </td>

                <td className="flex gap-3">
                  {f.status === "Verification Pending" && (
                    <>
                      <button
                        className="text-green-600"
                        onClick={() => approvePayment(f.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => rejectPayment(f.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* -------------- PROOF PREVIEW MODAL -------------- */}
      {previewProof && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-3xl w-full shadow-xl relative">

            <button
              onClick={() => setPreviewProof(null)}
              className="absolute top-2 right-2 text-red-600 text-xl font-bold"
            >
              ✕
            </button>

            {previewProof.includes("application/pdf") ? (
              <iframe
                src={previewProof}
                className="w-full h-[500px] rounded-lg"
              ></iframe>
            ) : (
              <img
                src={previewProof}
                alt="Payment Proof"
                className="max-h-[500px] mx-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminFees;
