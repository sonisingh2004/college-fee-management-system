import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// WEBSITE PAGES
import About from "./website/About";
import Contact from "./website/Contact";
import Courses from "./website/Courses";
import Home from "./website/Home";

// LOGIN PAGES
import AdminLogin from "./auth/AdminLogin";
import StudentLogin from "./auth/StudentLogin";

// ADMIN PAGES
import AdminAddStudent from "./admin/AdminAddStudent";
import AdminDashboard from "./admin/AdminDashboard";
import AdminFees from "./admin/AdminFees";
import AdminLayout from "./admin/AdminLayout";
import AdminReports from "./admin/AdminReports";
import AdminStudents from "./admin/AdminStudents";
import AdminTransactions from "./admin/AdminTransactions";

// STUDENT PAGES
import AdminRegister from "./auth/AdminRegister";
import StudentRegister from "./auth/StudentRegister";
import NotFound from "./NotFound";
import StudentDashboard from "./student/StudentDashboard";
import StudentFees from "./student/StudentFees";
import StudentLayout from "./student/StudentLayout";
import StudentPayments from "./student/StudentPayments";
import StudentProfile from "./student/StudentProfile";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ------ PUBLIC WEBSITE ------ */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />

        {/* ------ LOGIN ROUTES ------ */}
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ------ ADMIN DASHBOARD (PROTECTED) ------ */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="students/add" element={<AdminAddStudent />} />
          <Route path="fees" element={<AdminFees />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="transactions" element={<AdminTransactions />} />
        </Route>

        {/* ------ STUDENT DASHBOARD (PROTECTED) ------ */}
        <Route path="/student" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="payments" element={<StudentPayments />} />
          <Route path="fees" element={<StudentFees />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
