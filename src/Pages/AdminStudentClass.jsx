import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AdminStudentClass.css";

export default function AdminStudentClass() {
  const { className } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [section, setSection] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [className]);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("class", className);

    if (!error) {
      setStudents(data);
      setFilteredStudents(data);
    }
  };

  // 🔥 Section + Search Filter
  useEffect(() => {
    let temp = students;

    if (section !== "") {
      temp = temp.filter((s) => s.section === section);
    }

    if (search.trim() !== "") {
      temp = temp.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredStudents(temp);
  }, [section, search, students]);

  return (
    <div className="class-wrapper">

      <div className="class-card">

        {/* Heading */}
        <h2 className="class-heading">
          Class {className}
        </h2>

        {/* Section Filter */}
        <div className="section-filter">
          {["A", "B", "C"].map((sec) => (
            <button
              key={sec}
              className={section === sec ? "active" : ""}
              onClick={() =>
                setSection(section === sec ? "" : sec)
              }
            >
              {sec}
            </button>
          ))}
        </div>

        <hr className="divider" />

        {/* Search */}
        <input
          type="text"
          placeholder="Search Student..."
          className="class-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Student Grid */}
        <div className="student-grid">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="student-cell"
              onClick={() =>
                navigate(`/AdminStudentDashboard/${student.id}`)
              }
            >
              {student.name}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
