// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);

  // ----------------------------------------
  // IMAGE COMPRESSOR FUNCTION
  // ----------------------------------------
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

          // Resize image
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

          // Convert to compressed JPEG
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
          resolve(compressedBase64);
        };
      };

      reader.readAsDataURL(file);
    });
  }

  // ----------------------------------------
  // LOAD STUDENT DATA
  // ----------------------------------------
  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const found = students.find((s) => s.id === Number(id));

    if (!found) {
      alert("Student not found!");
      navigate("/admin/students");
      return;
    }

    setStudent(found);
  }, [id]);

  // ----------------------------------------
  // UPDATE STUDENT
  // ----------------------------------------
  async function handleUpdate(e) {
    e.preventDefault();

    let updated = { ...student };

    // If admin uploaded a new image → compress and save
    if (newProfileImage) {
      updated.profileImage = await compressImage(newProfileImage);
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const updatedList = students.map((s) =>
      s.id === updated.id ? updated : s
    );

    localStorage.setItem("students", JSON.stringify(updatedList));

    alert("Student updated successfully!");
    navigate("/admin/students");
  }

  if (!student)
    return <p className="text-gray-600">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Student</h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-2xl shadow space-y-5 max-w-2xl"
      >
        {/* PROFILE IMAGE */}
        <div>
          <label className="text-sm font-medium">Profile Image</label>

          <div className="flex items-center gap-4 mt-2">
            <img
              src={
                newProfileImage
                  ? URL.createObjectURL(newProfileImage)
                  : student.profileImage || "/default-avatar.png"
              }
              className="w-24 h-24 rounded-full object-cover border"
              alt="Profile"
            />

            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded-lg"
              onChange={(e) => setNewProfileImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="text-sm">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded-lg"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm">Password</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={student.password}
            onChange={(e) => setStudent({ ...student, password: e.target.value })}
          />
        </div>

        {/* ROLL NUMBER */}
        <div>
          <label className="text-sm">Roll Number</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={student.roll}
            onChange={(e) => setStudent({ ...student, roll: e.target.value })}
          />
        </div>

        {/* COURSE */}
        <div>
          <label className="text-sm">Course</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={student.course}
            onChange={(e) => setStudent({ ...student, course: e.target.value })}
          />
        </div>

        {/* BRANCH */}
        <div>
          <label className="text-sm">Branch</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={student.branch}
            onChange={(e) => setStudent({ ...student, branch: e.target.value })}
          >
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="AI & DS">AI & DS</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* YEAR */}
        <div>
          <label className="text-sm">Year / Semester</label>
          <input
            type="text"
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
            className="w-full border p-2 rounded-lg"
            value={student.phone}
            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
          />
        </div>

        {/* GENDER */}
        <div>
          <label className="text-sm">Gender</label>
          <select
            className="w-full border p-2 rounded-lg"
            value={student.gender}
            onChange={(e) => setStudent({ ...student, gender: e.target.value })}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-sm">Address</label>
          <textarea
            className="w-full border p-2 rounded-lg"
            rows="2"
            value={student.address}
            onChange={(e) => setStudent({ ...student, address: e.target.value })}
          ></textarea>
        </div>

        {/* PARENT NAME */}
        <div>
          <label className="text-sm">Parent Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={student.parentName}
            onChange={(e) =>
              setStudent({ ...student, parentName: e.target.value })
            }
          />
        </div>

        {/* PARENT CONTACT */}
        <div>
          <label className="text-sm">Parent Contact</label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            value={student.parentPhone}
            onChange={(e) =>
              setStudent({ ...student, parentPhone: e.target.value })
            }
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="text-sm">Status</label>
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

        {/* SUBMIT BUTTON */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          Update Student
        </button>
      </form>
    </div>
  );
}
