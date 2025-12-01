import { Link } from "react-router-dom";
import WebsiteLayout from "./WebsiteLayout";

export function Courses() {
const sampleCourses = [
{ id: 1, name: "B.Tech - Computer Science (CSE)", duration: "4 years", seats: 120, fees: "₹80,000/yr" },
{ id: 2, name: "B.Tech - Electronics (ECE)", duration: "4 years", seats: 90, fees: "₹75,000/yr" },
];


return (
<WebsiteLayout>
<h2 className="text-2xl font-bold mb-4">Courses</h2>
<div className="grid md:grid-cols-3 gap-6">
{sampleCourses.map((c) => (
<div key={c.id} className="bg-white p-5 rounded-xl shadow">
<h3 className="font-semibold">{c.name}</h3>
<p className="text-sm text-gray-600">Duration: {c.duration}</p>
<p className="text-sm text-gray-600">Seats: {c.seats}</p>
<p className="mt-4 font-bold">Fees: {c.fees}</p>
<div className="mt-4">
<Link to="/contact" className="text-blue-600 font-medium">Enquire</Link>
</div>
</div>
))}
</div>
</WebsiteLayout>
);
}


export default Courses;