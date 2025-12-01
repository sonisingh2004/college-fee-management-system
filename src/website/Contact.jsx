import { useState } from "react";
import WebsiteLayout from "./WebsiteLayout";

export function Contact() {
const [form, setForm] = useState({ name: "", email: "", message: "" });
const [sent, setSent] = useState(false);


function handleSubmit(e) {
e.preventDefault();
setSent(true);
setForm({ name: "", email: "", message: "" });
setTimeout(() => setSent(false), 3000);
}


return (
<WebsiteLayout>
<div className="grid md:grid-cols-2 gap-8">
<div className="bg-white p-6 rounded-xl shadow">
<h3 className="font-semibold text-lg mb-3">Contact Us</h3>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="text-sm font-medium">Name</label>
<input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border p-3 rounded-lg mt-1" />
</div>
<div>
<label className="text-sm font-medium">Email</label>
<input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required className="w-full border p-3 rounded-lg mt-1" />
</div>
<div>
<label className="text-sm font-medium">Message</label>
<textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="w-full border p-3 rounded-lg mt-1 h-28" />
</div>


<div>
<button className="bg-blue-600 text-white px-5 py-3 rounded-lg">Send Message</button>
</div>


{sent && <div className="text-sm text-green-600">Message sent — we will contact you soon.</div>}
</form>
</div>


<div className="bg-white p-6 rounded-xl shadow">
<h4 className="font-semibold mb-3">Visit Us</h4>
<div className="text-sm text-gray-600 space-y-3">
<p>123 College Road, City</p>
<p>+91 98765 43210</p>
<p>info@college.edu</p>
</div>
</div>
</div>
</WebsiteLayout>
);
}


export default Contact;