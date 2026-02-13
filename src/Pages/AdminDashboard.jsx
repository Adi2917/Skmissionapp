import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = [
    "Nursery","LKG","UKG",
    "1","2","3","4","5","6","7","8","9","10"
  ];

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (!adminData) navigate("/AdminLogin");
    else setAdmin(JSON.parse(adminData));
  }, [navigate]);

  // 🔥 Debounced realtime search
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchTerm.trim() === "") {
        setStudents([]);
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .ilike("name", `%${searchTerm}%`);

      if (!error) setStudents(data);
      else setStudents([]);

      setLoading(false);
    }, 300); // smooth delay

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/Home");
  };

  if (!admin) return null;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">

        <h1 className="school-title">SK Mission School</h1>
        <img src="/src/assets/logo.png" alt="logo" className="school-logo" />
        <p className="admin-sub">Hi Admin Here</p>

        {/* Search */}
        <div className="input-block">
          <input
            type="text"
            className="search"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {(students.length > 0 || loading) && (
            <div className="search-dropdown">
              {loading && <div className="search-item">Searching...</div>}

              {!loading && students.length === 0 && (
                <div className="search-item">No student found</div>
              )}

              {!loading && students.map((student) => (
                <div
                  key={student.id}
                  className="search-item"
                  onClick={() =>
                    navigate(`/AdminStudentDashboard/${student.id}`)
                  }
                >
                  {student.name} • {student.class}-{student.section}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Class Select */}
        <div className="input-block">
          <select
            onChange={(e) =>
              navigate(`/AdminStudentClass/${e.target.value}`)
            }
          >
            <option>Select Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        {/* Upload */}
        <button
          className="primary-btn"
          onClick={() => navigate("/AdminStudentNotification")}
        >
          Upload Notification
        </button>

        {/* Logout */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}
