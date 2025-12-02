import { CreditCard, FileText, Home, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";

// @ts-ignore
function StudentSidebar({ open }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const user = AuthService.getUser();
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

function handleLogout() {
  AuthService.logout();
  navigate("/login");
}
return (
<aside className={`bg-white h-full border-r ${open ? "w-56" : "w-0 md:w-56"} transition-all overflow-hidden`}>
<div className="p-4">
<div className="mb-6">
<div className="text-lg font-bold text-blue-600">{userName}</div>
<div className="text-sm text-gray-500">Roll: 12345</div>
</div>


<nav className="flex flex-col gap-2">
<Link to="/student" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50"><Home /> Dashboard</Link>
<Link to="/student/profile" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50"><User /> Profile</Link>
<Link to="/student/payments" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50"><CreditCard /> Payments</Link>
<Link to="/student/fees" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50"><FileText /> Fee Details</Link>
<button
  onClick={handleLogout}
  className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 text-red-600"
>
  <LogOut size={18} /> Logout
</button>
</nav>

</div>
</aside>
);
}

export default StudentSidebar