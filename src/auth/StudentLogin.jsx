// @ts-nocheck
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "./AuthService";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const result = AuthService.loginStudent(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/student");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Login</h2>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">Login</button>

        <p className="text-center text-sm mt-3">
          Not registered? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
