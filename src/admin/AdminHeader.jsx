import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthService } from "../auth/AuthService";

// @ts-ignore
function AdminHeader({ onToggle }) {
  const [admin, setAdmin] = useState({ name: "Admin", email: "admin@college.edu" });

  useEffect(() => {
    const user = AuthService.getUser();
    if (user) {
      setAdmin({
        name: user.name || "Admin",
        email: user.email || "admin@college.edu"
      });
    }
  }, []);

return (
<header className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">
<div className="flex items-center gap-4">
<button onClick={onToggle} className="p-2 rounded-md hover:bg-gray-100">
<Menu size={20} />
</button>


<h1 className="text-xl font-semibold text-blue-600">Fee Management - Admin</h1>
</div>


<div className="flex items-center gap-4">
<div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 gap-2">
<Search size={16} />
<input className="bg-transparent outline-none w-40 text-sm" placeholder="Search students, fees..." />
</div>


<button className="p-2 rounded-md hover:bg-gray-100">
<Bell size={18} />
</button>


<button className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm">
<img src="/logo192.png" alt="avatar" className="w-6 h-6 rounded-full" />
<div className="flex flex-col text-left">
<span className="font-medium">{admin.name}</span>
<span className="text-xs text-gray-500">{admin.email}</span>
</div>
</button>
</div>
</header>
);
}

export default AdminHeader;