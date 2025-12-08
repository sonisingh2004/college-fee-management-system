import { BookOpen, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import WebsiteLayout from "./WebsiteLayout";

export function Home() {
  return (
    <WebsiteLayout>

      {/* HERO SECTION */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white rounded-2xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Fee Management System
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Streamline your college fee management, track payments, and manage student records efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Student Login
            </Link>

            <Link
              to="/admin/login"
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Admin Login
            </Link>

            <Link
              to="/courses"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <BookOpen size={32} className="text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Fee Tracking</h3>
          <p className="text-gray-600">
            Track your fee payments, due dates, and payment history all in one place.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Users size={32} className="text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
          <p className="text-gray-600">
            Manage students, fees, and generate reports with ease and clarity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Zap size={32} className="text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
          <p className="text-gray-600">
            Get instant notifications and updates on your fee status and transactions.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ View fee structure and payment schedule</li>
            <li>✓ Make online payments securely</li>
            <li>✓ Download payment receipts</li>
            <li>✓ Track payment history</li>
          </ul>
          <Link to="/login" className="mt-4 inline-block text-blue-600 font-semibold hover:underline">
            Student Login →
          </Link>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">For Administrators</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Add and manage student records</li>
            <li>✓ Monitor fee collections</li>
            <li>✓ Generate detailed reports</li>
            <li>✓ Manage transactions</li>
          </ul>
          <Link to="/admin/login" className="mt-4 inline-block text-gray-900 font-semibold hover:underline">
            Admin Login →
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-8 text-lg">
          Join us today and simplify your fee management process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Student Register
          </Link>
          <Link
            to="/admin/register"
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            Admin Register
          </Link>
        </div>
      </section>

    </WebsiteLayout>
  );
}

export default Home;
