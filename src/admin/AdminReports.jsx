// @ts-nocheck
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function AdminReports() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How do I add a new student?",
      answer:
        "Go to the 'Students' section and click 'Add New Student'. Fill in all required information including name, email, password, roll number, course, branch, and semester. Upload a profile image (optional). Click 'Add Student' to save.",
    },
    {
      id: 2,
      question: "How do I create fee structures?",
      answer:
        "Navigate to the 'Fees' section. Fill in the fee title, amount, due date, select a course and semester, and choose whether to assign to all students or specific ones. Click 'Create & Send' to create the fees.",
    },
    {
      id: 3,
      question: "How do I approve or reject student payments?",
      answer:
        "Go to the 'Fees' section and look for fees with 'Verification Pending' status. Click 'View Proof' to see the payment proof submitted by the student. Then click either 'Approve' or 'Reject' to process the payment.",
    },
    {
      id: 4,
      question: "Can I filter fees by course and semester?",
      answer:
        "Yes! In the 'Fees' section, select a course and semester from the dropdown filters. The 'Assign To' student list will automatically update to show only students from the selected course and semester.",
    },
    {
      id: 5,
      question: "How do I edit a student's information?",
      answer:
        "Go to the 'Students' section, find the student you want to edit, and click the edit button. Update the required fields and click 'Update Student' to save your changes.",
    },
    {
      id: 6,
      question: "What are the different student statuses?",
      answer:
        "Students can have two statuses: 'Active' (currently enrolled) or 'Inactive' (not currently enrolled). You can change a student's status in the edit student page.",
    },
    {
      id: 7,
      question: "How do I view all transactions?",
      answer:
        "Navigate to the 'Transactions' section to see all payment transactions, including pending, approved, and rejected payments. You can view details about each transaction.",
    },
    {
      id: 8,
      question: "Can I delete a student record?",
      answer:
        "Yes, you can delete student records from the Students section. Click the delete button next to a student's name. This will permanently remove the student and all their associated data.",
    },
    {
      id: 9,
      question: "What file formats can students upload for payment proof?",
      answer:
        "Students can upload image files (JPG, PNG, etc.) or PDF files as payment proof. The system will display these files for your review.",
    },
    {
      id: 10,
      question: "How do I export student or fee data?",
      answer:
        "Go to the Reports section to generate and download student fee reports and analytics. You can export data in CSV format for use in spreadsheet applications.",
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reports & FAQ</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* REPORTS SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">Reports</h3>
          <p className="text-gray-600 mb-4">
            Download student fee reports, view analytics and export CSVs.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Download Report
          </button>
        </div>

        {/* QUICK STATS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Total Students Registered</p>
            <p>• Pending Fee Collections</p>
            <p>• Fees Approved This Month</p>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

        <div className="space-y-3">
          {faqData.map((faq) => (
            <div key={faq.id} className="border rounded-lg">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <span className="font-medium text-left text-gray-800">
                  {faq.question}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUp size={20} className="text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400 shrink-0" />
                )}
              </button>

              {openFAQ === faq.id && (
                <div className="px-4 pb-4 text-gray-600 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminReports;