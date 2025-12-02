import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentHeader from "./StudentHeader";
import StudentSidebar from "./StudentSidebar";

function StudentLayout() {
const [open, setOpen] = useState(true);


return (
<div className="min-h-screen flex bg-gray-50">
<div className={`${open ? "w-56" : "w-0 md:w-56"} transition-all`}>
<StudentSidebar open={open} />
</div>


<div className="flex-1 flex flex-col">
<StudentHeader onToggle={() => setOpen((s) => !s)} />
<main className="p-6">
<Outlet />
</main>
</div>
</div>
);
}


export default StudentLayout;