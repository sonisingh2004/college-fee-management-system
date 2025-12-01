import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";


export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`${collapsed ? "w-20" : "w-64"} transition-all`}>
        <AdminSidebar collapsed={collapsed} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader onToggle={() => setCollapsed(!collapsed)} />

        <main className="p-6">
          {/* THIS MUST EXIST */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
