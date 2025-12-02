import { useState } from "react";
import { Link } from "react-router-dom";

export function WebsiteHeader() {
return (
<header className="bg-white shadow-sm">
<div className="container mx-auto px-6 py-4 flex items-center justify-between">
<Link to="/" className="text-2xl font-bold text-blue-600">CollegeName</Link>


<nav className="hidden md:flex items-center gap-6 text-gray-700">
<Link to="/" className="hover:text-blue-600">Home</Link>
<Link to="/about" className="hover:text-blue-600">About</Link>
<Link to="/courses" className="hover:text-blue-600">Courses</Link>
<Link to="/contact" className="hover:text-blue-600">Contact</Link>
<Link to="/login" className="ml-4 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">Login</Link>
</nav>


<div className="md:hidden">
<MobileMenuSmall />
</div>
</div>
</header>
);
}


function MobileMenuSmall() {
const [open, setOpen] = useState(false);
return (
<div className="relative">
<button onClick={() => setOpen(!open)} className="p-2 rounded-md border">☰</button>
{open && (
<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
<Link to="/" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Home</Link>
<Link to="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>About</Link>
<Link to="/courses" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Courses</Link>
<Link to="/contact" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Contact</Link>
<Link to="/admin" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Admin</Link>
</div>
)}
</div>
);
}


export default WebsiteHeader;