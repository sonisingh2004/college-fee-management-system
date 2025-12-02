import { ChevronLeft, ChevronRight, CreditCard, FileBarChart2, HomeIcon, LogOut, PlusCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";


// @ts-ignore
function AdminSidebar({ collapsed }) {
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const user = AuthService.getUser();
    if (user && user.name) {
      setAdminName(user.name);
    }
  }, []);

const navigate = useNavigate();

function handleLogout() {
  AuthService.logout();
  navigate("/admin/login");
}
return (
<aside className={`bg-white h-full border-r ${collapsed ? "w-20" : "w-64"} transition-all`}>
<div className="p-4">
<div className="mb-6 flex items-center justify-between">
{!collapsed && <div className="text-lg font-bold text-blue-600">{adminName}</div>}
{collapsed ? <ChevronRight /> : <ChevronLeft />}
</div>


<nav className="flex flex-col gap-2">
<Link to="/admin" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<HomeIcon /> {!collapsed && <span>Dashboard</span>}
</Link>


<Link to="/admin/students" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<Users /> {!collapsed && <span>Students</span>}
</Link>


<Link to="/admin/students/add" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<PlusCircle /> {!collapsed && <span>Add Student</span>}
</Link>


<Link to="/admin/fees" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<CreditCard /> {!collapsed && <span>Fees</span>}
</Link>


<Link to="/admin/transactions" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<FileBarChart2 /> {!collapsed && <span>Transactions</span>}
</Link>


<Link to="/admin/reports" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<FileBarChart2 /> {!collapsed && <span>Reports</span>}
</Link>
</nav>


<div className="mt-8 pt-4 border-t">
<button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-50">
<LogOut /> {!collapsed && <span>Logout</span>}
</button>
</div>
</div>
</aside>
);
}

export default AdminSidebar;