import { Bell, LogOut, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../auth/AuthService";

// @ts-ignore
function StudentHeader({ onToggle }) {
const [userName, setUserName] = useState("Student");
const navigate = useNavigate();

useEffect(() => {
const user = AuthService.getUser();
if (user && user.name) {
setUserName(user.name);
}
}, []);

const handleLogout = () => {
  AuthService.logout();
  navigate("/login");
};

return (
<header className="w-full bg-white border-b px-6 py-3 flex items-center justify-between">
<div className="flex items-center gap-4">
<button onClick={onToggle} className="p-2 rounded-md hover:bg-gray-100 md:hidden">
<Menu size={20} />
</button>
<h1 className="text-lg font-semibold text-blue-600">Student Portal</h1>
</div>


<div className="flex items-center gap-4">
<button className="p-2 rounded-md hover:bg-gray-100">
<Bell size={18} />
</button>
<div className="flex items-center gap-2 border px-3 py-1 rounded-full">
<User size={16} />
<span className="text-sm">{userName}</span>
</div>
<button 
  onClick={handleLogout}
  className="p-2 rounded-md hover:bg-red-50 text-red-600"
  title="Logout"
>
<LogOut size={18} />
</button>
</div>
</header>
);
}
export default StudentHeader