

import { BrowserRouter, Route, Routes } from "react-router-dom";


// WEBSITE PAGES
import About from "./website/About";
import Contact from "./website/Contact";
import Courses from "./website/Courses";
import Home from "./website/Home";



// ADMIN PAGES
import { AdminAddStudent } from "./admin/AdminAddStudent";
import AdminDashboard from "./admin/AdminDashboard";
import AdminFees from "./admin/AdminFees";
import { AdminLayout } from "./admin/AdminLayout";
import AdminReports from "./admin/AdminReports";
import AdminStudents from "./admin/AdminStudents";
import AdminTransactions from "./admin/AdminTransactions";


export default function MainRouter() {
return (
<BrowserRouter>
<Routes>
{/* PUBLIC WEBSITE */}
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/courses" element={<Courses />} />
<Route path="/contact" element={<Contact />} />


{/* ADMIN DASHBOARD */}
<Route path="/admin" element={<AdminLayout />}>
<Route index element={<AdminDashboard />} />
<Route path="students" element={<AdminStudents />} />
<Route path="students/add" element={<AdminAddStudent />} />
<Route path="fees" element={<AdminFees />} />
<Route path="reports" element={<AdminReports />} />
<Route path="transactions" element={<AdminTransactions />} />
</Route>
</Routes>
</BrowserRouter>
);
}