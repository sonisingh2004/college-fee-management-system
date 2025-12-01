import WebsiteLayout from "./WebsiteLayout";

export function About() {
return (
<WebsiteLayout>
<div className="bg-white p-8 rounded-xl shadow">
<h2 className="text-2xl font-bold mb-4">About CollegeName</h2>
<p className="text-gray-600">CollegeName was established with the vision to provide quality technical education.</p>
</div>
</WebsiteLayout>
);
}


export default About;