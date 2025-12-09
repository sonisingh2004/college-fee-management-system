// @ts-nocheck
import { useEffect, useState } from "react";
import { AuthService } from "../auth/AuthService";

export default function StudentPayments() {
  const user = AuthService.getUser();
  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [proofFile, setProofFile] = useState(null);

  useEffect(() => {
    const allFees = JSON.parse(localStorage.getItem("fees")) || [];
    const filtered = allFees.filter((f) => f.studentId === user.id);
    setFees(filtered);
  }, [user.id]);

  // Open Upload Modal
  function openProofModal(fee) {
    setSelectedFee(fee);
  }

  // Convert File → Base64
  function fileToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result, file.type);
    reader.readAsDataURL(file);
  }

  // Submit Proof
  function submitProof() {
    if (!proofFile) {
      alert("Please upload payment proof.");
      return;
    }

    fileToBase64(proofFile, (base64, mimeType) => {
      // Ensure correct MIME formatting
      const cleanedBase64 = base64.startsWith("data:")
        ? base64
        : `data:${mimeType};base64,${base64.split(",")[1]}`;

      const updatedFees = fees.map((fee) =>
        fee.id === selectedFee.id
          ? { ...fee, status: "Verification Pending", proof: cleanedBase64 }
          : fee
      );

      setFees(updatedFees);

      // Update in global localStorage
      const allFees = JSON.parse(localStorage.getItem("fees")) || [];
      const updatedAll = allFees.map((fee) =>
        fee.id === selectedFee.id
          ? { ...fee, status: "Verification Pending", proof: cleanedBase64 }
          : fee
      );

      localStorage.setItem("fees", JSON.stringify(updatedAll));

      alert("Proof submitted! Waiting for admin approval.");
      setSelectedFee(null);
      setProofFile(null);
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Payments</h2>

      <div className="bg-white p-6 rounded-2xl shadow">
        {fees.length === 0 ? (
          <p className="text-gray-500">No fee records available.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((f) => (
                <tr key={f.id} className="border-b">
                  <td className="py-2">{f.title}</td>
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
                    {f.status === "Pending" ? (
                      <button
                        onClick={() => openProofModal(f)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Submit Proof
                      </button>
                    ) : f.status === "Verification Pending" ? (
                      <span className="text-yellow-600 text-sm">
                        Waiting for Approval
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PROOF UPLOAD MODAL */}
      {selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              Upload Payment Proof for: {selectedFee.title}
            </h3>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setProofFile(e.target.files[0])}
              className="border p-2 w-full mb-4 rounded-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedFee(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={submitProof}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit Proof
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
