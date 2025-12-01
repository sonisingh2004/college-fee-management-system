import { Link } from "react-router-dom";
import WebsiteLayout from "./WebsiteLayout";

export function Home() {
return (
<WebsiteLayout>
<section className="grid md:grid-cols-2 gap-8 items-center">
<div>
<h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CollegeName</h2>
<p className="text-gray-600 mb-6">Quality education, modern facilities, and a nurturing environment for every student.</p>
<div className="flex gap-4">
<Link to="/courses" className="bg-blue-600 text-white px-5 py-3 rounded-lg">Explore Courses</Link>
<Link to="/contact" className="border px-5 py-3 rounded-lg">Contact Us</Link>
</div>
</div>


<div>
<div className="bg-white rounded-2xl shadow-lg p-6">
<h3 className="font-semibold mb-3">Admissions</h3>
<p className="text-sm text-gray-600 mb-4">Admissions open for the new academic year. Apply now.</p>
<Link to="/contact" className="text-blue-600 font-medium">Enquire Now →</Link>
</div>


<div className="mt-6 grid grid-cols-2 gap-4">
<div className="bg-white p-4 rounded-xl shadow">
<h4 className="text-lg font-semibold">Departments</h4>
<p className="text-sm text-gray-600">CSE, ECE, ME, Civil</p>
</div>
<div className="bg-white p-4 rounded-xl shadow">
<h4 className="text-lg font-semibold">Facilities</h4>
<p className="text-sm text-gray-600">Library, Labs, Hostels</p>
</div>
</div>
</div>
</section>


<section className="mt-12 grid md:grid-cols-3 gap-6">
<div className="bg-white p-6 rounded-xl shadow">
<h4 className="font-semibold">Academic Excellence</h4>
<p className="text-sm text-gray-600 mt-2">Strong curriculum and experienced faculty.</p>
</div>
<div className="bg-white p-6 rounded-xl shadow">
<h4 className="font-semibold">Student Support</h4>
<p className="text-sm text-gray-600 mt-2">Counselling, career guidance, and scholarships.</p>
</div>
<div className="bg-white p-6 rounded-xl shadow">
<h4 className="font-semibold">Research & Innovation</h4>
<p className="text-sm text-gray-600 mt-2">Projects, labs and industry partnerships.</p>
</div>
</section>
</WebsiteLayout>
);
}


export default Home;