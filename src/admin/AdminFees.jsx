// @ts-nocheck
import { useEffect, useState } from "react";

// Initialize IndexedDB for retrieving payment proofs
function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FeeManagementDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("paymentProofs")) {
        db.createObjectStore("paymentProofs", { keyPath: "feeId" });
      }
    };
  });
}

// Retrieve proof from IndexedDB
async function getProofFromIndexedDB(feeId) {
  const db = await initializeDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["paymentProofs"], "readonly");
    const store = transaction.objectStore("paymentProofs");
    const request = store.get(feeId);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result?.proof || null);
  });
}

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
    course: "all",
    semester: "all",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Filter students based on course and semester
  function getFilteredStudents() {
    return students.filter((s) => {
      if (form.course !== "all" && s.course !== form.course) return false;
      if (form.semester !== "all" && s.year !== form.semester) return false;
      return true;
    });
  }

  function handleCreateFee(e) {
    e.preventDefault();
    const amountNumber = Number(form.amount);
    if (!form.title || !form.amount) return;

    let newFees = [];

    if (form.studentId === "all") {
      // If assigning to all, use filtered students based on course/semester
      const targetStudents = form.course !== "all" || form.semester !== "all" 
        ? getFilteredStudents() 
        : students;
      
      newFees = targetStudents.map((s) => ({
        id: Date.now() + "-" + s.id,
        studentId: s.id,
        student: s.name,
        title: form.title,
        amount: amountNumber,
        dueDate: form.dueDate,
        course: s.course,
        semester: s.year,
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
          course: s.course,
          semester: s.year,
          status: "Pending",
          proof: null,
        },
      ];
    }

    setFees((prev) => [...prev, ...newFees]);
    setForm({ title: "", amount: "", dueDate: "", studentId: "all", course: "all", semester: "all" });
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
            <label className="text-sm font-medium">Course</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            >
              <option value="all">All Courses</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="M.A">M.A</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Semester</label>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            >
              <option value="all">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Assign To</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg mt-1"
            >
              <option value="all">All Students{form.course !== "all" || form.semester !== "all" ? ` (${getFilteredStudents().length})` : ""}</option>
              {getFilteredStudents().map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.course} - Sem {s.year})
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
                  {f.status === "Verification Pending" && (
                    <button
                      onClick={async () => {
                        const proof = await getProofFromIndexedDB(f.id);
                        if (proof) {
                          setPreviewProof(proof);
                        } else {
                          alert("No proof found for this fee.");
                        }
                      }}
                      className="text-blue-600 underline"
                    >
                      View Proof
                    </button>
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
