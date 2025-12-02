// @ts-nocheck
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "./AuthService";

export default function AdminRegister() {
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const result = AuthService.registerAdmin(admin);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Admin registered successfully! Redirecting to login...");
    setTimeout(() => navigate("/admin/login"), 1500);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Registration</h2>

        {message && <div className="text-blue-600 text-sm mb-3">{message}</div>}

        <input
          type="text"
          placeholder="Admin Username"
          className="w-full border p-3 rounded-lg mb-3"
          value={admin.username}
          onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
          value={admin.email}
          onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={admin.password}
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">Register</button>

        <p className="text-center text-sm mt-3">
          Already an admin? <Link to="/admin/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
