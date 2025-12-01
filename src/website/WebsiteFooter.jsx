import { Link } from "react-router-dom";

export function WebsiteFooter() {
return (
<footer className="bg-white border-t mt-12">
<div className="container mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
<div>
<h3 className="font-semibold text-lg">CollegeName</h3>
<p className="text-sm text-gray-600 mt-2">A place of learning, innovation and growth.</p>
</div>


<div>
<h4 className="font-medium">Contact</h4>
<ul className="text-sm text-gray-600 mt-2 space-y-2">
<li>123 College Road, City</li>
<li>+91 98765 43210</li>
<li>info@college.edu</li>
</ul>
</div>


<div>
<h4 className="font-medium">Quick Links</h4>
<ul className="text-sm text-gray-600 mt-2 space-y-2">
<li><Link to="/about" className="hover:text-blue-600">About</Link></li>
<li><Link to="/courses" className="hover:text-blue-600">Courses</Link></li>
<li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
</ul>
</div>
</div>


<div className="border-t bg-gray-50 py-4">
<div className="container mx-auto px-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} CollegeName. All rights reserved.</div>
</div>
</footer>
);
}


export default WebsiteFooter;