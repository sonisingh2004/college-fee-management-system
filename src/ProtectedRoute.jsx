// @ts-nocheck
import { Navigate } from "react-router-dom";
import { AuthService } from "./auth/AuthService";

export default function ProtectedRoute({ children, requiredRole }) {
  const user = AuthService.getUser();
  
  // Debug: Check what's in user object
  console.log("ProtectedRoute - User Object:", user);
  console.log("ProtectedRoute - Required Role:", requiredRole);

  // If no user is logged in, redirect to appropriate login page
  if (!user || !user.role) {
    console.log("ProtectedRoute - No user or role, redirecting to login");
    if (requiredRole === "admin") {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && user.role !== requiredRole) {
    console.log("ProtectedRoute - Role mismatch. User role:", user.role, "Required:", requiredRole);
    // Redirect to appropriate dashboard based on user role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/student" replace />;
  }

  // User is authenticated and has the required role
  console.log("ProtectedRoute - Access granted");
  return children;
}
