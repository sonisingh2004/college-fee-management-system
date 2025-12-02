import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          Student Login
        </Link>

        <Link
          to="/admin/login"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}
