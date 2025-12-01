export function InfoCard({ title, value, icon: Icon }) {
return (
<div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition">
<div className="bg-blue-100 p-4 rounded-full">
<Icon className="text-blue-600" size={28} />
</div>
<div>
<h2 className="text-gray-500 text-sm">{title}</h2>
<p className="text-2xl font-bold">{value}</p>
</div>
</div>
);
}