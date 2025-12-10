// @ts-nocheck
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminAddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    roll: "",
    branch: "",
    phone: "",
    address: "",
    gender: "",
    year: "",
    parentName: "",
    parentPhone: "",
    status: "active",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // ------------------------------------------------------
  // IMAGE COMPRESSOR (Same as Edit Page for consistency)
  // ------------------------------------------------------
  function compressImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;

          let width = img.width;
          let height = img.height;

          // Resize Algorithm
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (width * MAX_HEIGHT) / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
          resolve(compressedBase64);
        };
      };

      reader.readAsDataURL(file);
    });
  }

  // ------------------------------------------------------
  // SUBMIT FORM
  // ------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    const students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.find((s) => s.email === student.email)) {
      toast.error("Email already exists!");
      return;
    }

    let compressedImage = null;

    if (profileImage) {
      compressedImage = await compressImage(profileImage);
    }

    const newStudent = {
      id: Date.now(),
      ...student,
      profileImage: compressedImage,
    };

    localStorage.setItem("students", JSON.stringify([...students, newStudent]));

    toast.success("Student added successfully!");
    setTimeout(() => navigate("/admin/students"), 1500);
  }

  // ------------------------------------------------------
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">

          {/* PROFILE IMAGE UPLOAD */}
          <div className="md:col-span-2">
            <label className="text-sm">Profile Image</label>

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded-lg"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />

            {profileImage && (
              <img
                src={URL.createObjectURL(profileImage)}
                className="mt-3 w-24 h-24 rounded-full object-cover border"
                alt="Preview"
              />
            )}
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm">Email (Login ID)</label>
            <input
              type="email"
              required
              className="w-full border p-2 rounded-lg"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full border p-2 pr-10 rounded-lg"
                value={student.password}
                onChange={(e) =>
                  setStudent({ ...student, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* ROLL */}
          <div>
            <label className="text-sm">Roll Number</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg"
              value={student.roll}
              onChange={(e) => setStudent({ ...student, roll: e.target.value })}
            />
          </div>

          {/* COURSE */}
          <div>
            <label className="text-sm">Course</label>
            <select
              required
              className="w-full border p-2 rounded-lg"
              value={student.course}
              onChange={(e) =>
                setStudent({ ...student, course: e.target.value })
              }
            >
              <option value="">Select Course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
              <option value="M.A">M.A</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          {/* BRANCH */}
          <div>
            <label className="text-sm">Branch</label>
            <select
              required
              className="w-full border p-2 rounded-lg"
              value={student.branch}
              onChange={(e) =>
                setStudent({ ...student, branch: e.target.value })
              }
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="AI & DS">AI & DS</option>
            </select>
          </div>

          {/* YEAR */}
          <div>
            <label className="text-sm">Semester</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg"
              value={student.year}
              onChange={(e) => setStudent({ ...student, year: e.target.value })}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm">Phone Number</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg"
              value={student.phone}
              onChange={(e) => setStudent({ ...student, phone: e.target.value })}
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm">Gender</label>
            <select
              required
              className="w-full border p-2 rounded-lg"
              value={student.gender}
              onChange={(e) => setStudent({ ...student, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="text-sm">Address</label>
            <textarea
              required
              rows="2"
              className="w-full border p-2 rounded-lg"
              value={student.address}
              onChange={(e) => setStudent({ ...student, address: e.target.value })}
            ></textarea>
          </div>

          {/* PARENT NAME */}
          <div>
            <label className="text-sm">Parent Name</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg"
              value={student.parentName}
              onChange={(e) =>
                setStudent({ ...student, parentName: e.target.value })
              }
            />
          </div>

          {/* PARENT PHONE */}
          <div>
            <label className="text-sm">Parent Contact</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded-lg"
              value={student.parentPhone}
              onChange={(e) =>
                setStudent({ ...student, parentPhone: e.target.value })
              }
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm">Student Status</label>
            <select
              className="w-full border p-2 rounded-lg"
              value={student.status}
              onChange={(e) =>
                setStudent({ ...student, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          Add Student
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
