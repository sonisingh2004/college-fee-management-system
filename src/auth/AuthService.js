// @ts-nocheck
// Get all registered students
function getAllStudents() {
  try {
    const data = localStorage.getItem("students");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error getting students:", e);
    return [];
  }
}

// Get all admins
function getAllAdmins() {
  try {
    const data = localStorage.getItem("admins");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error getting admins:", e);
    return [];
  }
}

export const AuthService = {

  // ------------------- STUDENT REGISTER -------------------
  registerStudent(student) {
    const students = getAllStudents();

    const exists = students.find((s) => s.email === student.email);
    if (exists) return { success: false, message: "Email already registered" };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    console.log("Student registered:", student);

    return { success: true };
  },

  // ------------------- ADMIN REGISTER -------------------
  registerAdmin(admin) {
    const admins = getAllAdmins();

    const exists = admins.find((s) => s.username === admin.username);
    if (exists) return { success: false, message: "Admin username already exists" };

    admins.push(admin);
    localStorage.setItem("admins", JSON.stringify(admins));
    console.log("Admin registered:", admin);

    return { success: true };
  },

  // ------------------- STUDENT LOGIN -------------------
  loginStudent(email, password) {
    const students = getAllStudents();
    const user = students.find((s) => s.email === email && s.password === password);

    if (!user) {
      console.log("Student login failed - invalid credentials");
      return { success: false, message: "Invalid student credentials" };
    }

    const authData = { role: "student", email, name: user.name };
    localStorage.setItem("auth", JSON.stringify(authData));
    console.log("Student logged in. Auth data:", authData);
    return { success: true, user };
  },

  // ------------------- ADMIN LOGIN -------------------
  loginAdmin(email, password) {
    const admins = getAllAdmins();
    const admin = admins.find((s) => s.email === email && s.password === password);

    if (!admin) {
      console.log("Admin login failed - invalid credentials");
      return { success: false, message: "Invalid admin credentials" };
    }

    const authData = { role: "admin", email, name: admin.username };
    localStorage.setItem("auth", JSON.stringify(authData));
    console.log("Admin logged in. Auth data:", authData);
    return { success: true, admin };
  },

  // ------------------- LOGOUT -------------------
  logout() {
    localStorage.removeItem("auth");
    console.log("User logged out");
  },

  // ------------------- GET CURRENT USER -------------------
  getUser() {
    try {
      const data = localStorage.getItem("auth");
      const user = data ? JSON.parse(data) : null;
      console.log("getUser() returning:", user);
      return user;
    } catch (e) {
      console.error("Error getting user:", e);
      return null;
    }
  },

  // ------------------- ROLE CHECK -------------------
  isStudent() {
    const user = this.getUser();
    return user && user.role === "student";
  },

  isAdmin() {
    const user = this.getUser();
    return user && user.role === "admin";
  },

  // ------------------- CLEAR ALL DATA (for testing) -------------------
  clearAllData() {
    localStorage.removeItem("auth");
    localStorage.removeItem("students");
    localStorage.removeItem("admins");
    console.log("All auth data cleared");
  }
};
