// @ts-nocheck
// Get all registered students
function getAllStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

// Get all admins
function getAllAdmins() {
  return JSON.parse(localStorage.getItem("admins")) || [];
}

export const AuthService = {

  // ------------------- STUDENT REGISTER -------------------
  registerStudent(student) {
    const students = getAllStudents();

    const exists = students.find((s) => s.email === student.email);
    if (exists) return { success: false, message: "Email already registered" };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    return { success: true };
  },

  // ------------------- ADMIN REGISTER -------------------
  registerAdmin(admin) {
    const admins = getAllAdmins();

    const exists = admins.find((s) => s.username === admin.username);
    if (exists) return { success: false, message: "Admin username already exists" };

    admins.push(admin);
    localStorage.setItem("admins", JSON.stringify(admins));

    return { success: true };
  },

  // ------------------- STUDENT LOGIN -------------------
  loginStudent(email, password) {
    const students = getAllStudents();
    const user = students.find((s) => s.email === email && s.password === password);

    if (!user) return { success: false, message: "Invalid student credentials" };

    localStorage.setItem("auth", JSON.stringify({ role: "student", email, name: user.name }));
    return { success: true, user };
  },

  // ------------------- ADMIN LOGIN -------------------
  loginAdmin(email, password) {
    const admins = getAllAdmins();
    const admin = admins.find((s) => s.email === email && s.password === password);

    if (!admin) return { success: false, message: "Invalid admin credentials" };

    localStorage.setItem("auth", JSON.stringify({ role: "admin", email, name: admin.username }));
    return { success: true, admin };
  },

  // ------------------- LOGOUT -------------------
  logout() {
    localStorage.removeItem("auth");
  },

  // ------------------- GET CURRENT USER -------------------
  getUser() {
    return JSON.parse(localStorage.getItem("auth"));
  },

  // ------------------- ROLE CHECK -------------------
  isStudent() {
    const user = AuthService.getUser();
    return user && user.role === "student";
  },

  isAdmin() {
    const user = AuthService.getUser();
    return user && user.role === "admin";
  }
};
