import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentCard({ students, searchTerm }) {
  const navigate = useNavigate();

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredStudents.length === 0) return <p className="no-student">No students found</p>;

  return (
    <div className="student-list">
      {filteredStudents.map((student) => (
        <div
          key={student.id}
          className="student-card"
          onClick={() => navigate(`/AdminStudentDashboard/${student.id}`)}
        >
          {student.name}
        </div>
      ))}
    </div>
  );
}
