// @ts-nocheck
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "./AuthService";

export default function StudentRegister() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const result = AuthService.registerStudent(student);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Registration</h2>

        {message && <div className="text-blue-600 text-sm mb-3">{message}</div>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-3"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={student.password}
          onChange={(e) => setStudent({ ...student, password: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">Register</button>

        <p className="text-center text-sm mt-3">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
