import { Link } from "react-router-dom";
import WebsiteLayout from "./WebsiteLayout";

export function Home() {
  return (
    <WebsiteLayout>

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-12 items-center py-16">
        <div>
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 text-transparent bg-clip-text mb-6 leading-tight">
            Welcome to CollegeName
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            A premier institute offering quality education, modern infrastructure,
            and limitless opportunities for every student.
          </p>

          <div className="flex gap-4">
            <Link
              to="/courses"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Explore Courses
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg transition-all shadow"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border hover:shadow-2xl transition-all">
            <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
              🎓 Admissions
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Admissions open for the new academic year. Apply now to secure your seat.
            </p>
            <Link className="text-blue-600 font-medium hover:underline" to="/contact">
              Enquire Now →
            </Link>
          </div>

          {/* SMALL INFO CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl shadow hover:shadow-xl transition">
              <h4 className="text-lg font-semibold">🏛 Departments</h4>
              <p className="text-gray-600 text-sm mt-1">CSE, ECE, ME, Civil</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl shadow hover:shadow-xl transition">
              <h4 className="text-lg font-semibold">🏫 Facilities</h4>
              <p className="text-gray-600 text-sm mt-1">Library, Labs, Hostels</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <h4 className="font-bold text-xl">📘 Academic Excellence</h4>
          <p className="text-gray-600 mt-2">
            Strong curriculum, experienced faculty, and top results every year.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <h4 className="font-bold text-xl">🤝 Student Support</h4>
          <p className="text-gray-600 mt-2">
            Counselling, career guidance, scholarships, and mentorship.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <h4 className="font-bold text-xl">🔬 Research & Innovation</h4>
          <p className="text-gray-600 mt-2">
            State-of-the-art labs, projects, and industry collaborations.
          </p>
        </div>
      </section>

    </WebsiteLayout>
  );
}

export default Home;
