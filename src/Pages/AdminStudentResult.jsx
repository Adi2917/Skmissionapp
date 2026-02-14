import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaTrash } from "react-icons/fa";
import "./AdminStudentResult.css";

const defaultSubjects = [
  "Maths",
  "Hindi",
  "English",
  "Science",
  "SSt",
  "Computer",
  "GK"
];

export default function AdminStudentResult() {
  const { studentId } = useParams();

  const [examTypes, setExamTypes] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchExamTypes();
  }, []);

  const fetchExamTypes = async () => {
    const { data } = await supabase.from("exam_types").select("*");
    setExamTypes(data || []);
  };

  const handleAddExamType = async () => {
    const name = prompt("Enter Exam Name");
    if (!name) return;

    await supabase.from("exam_types").insert({ name });
    fetchExamTypes();
  };

  const handleAddSubject = () => {
    const newSub = prompt("Enter Subject Name");
    if (!newSub) return;
    setSubjects([...subjects, newSub]);
  };

  const handleDeleteSubject = (sub) => {
    setSubjects(subjects.filter((s) => s !== sub));
  };

  const handleSave = async () => {
    if (!selectedExam) {
      alert("Select Exam Type");
      return;
    }

    const insertData = subjects.map((sub) => ({
      student_id: studentId,
      exam_type_id: selectedExam,
      subject: sub,
      marks: parseInt(marks[sub] || 0)
    }));

    await supabase.from("results").delete().eq("student_id", studentId).eq("exam_type_id", selectedExam);

    await supabase.from("results").insert(insertData);

    alert("Result Saved Successfully");
  };

  return (
    <div className="admin-result-container">
      <h2>Upload Student Result</h2>

      <div className="top-controls">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Select Exam Type</option>
          {examTypes.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>

        <button onClick={handleAddExamType}>+ Add Exam</button>
        <button onClick={handleAddSubject}>+ Add Subject</button>
      </div>

      <div className="marks-table">
        <div className="table-header">
          <span>Subject</span>
          <span>Marks</span>
          <span>Action</span>
        </div>

        {subjects.map((sub) => (
          <div className="table-row" key={sub}>
            <span>{sub}</span>
            <input
              type="number"
              placeholder="Enter marks"
              onChange={(e) =>
                setMarks({ ...marks, [sub]: e.target.value })
              }
            />
            <FaTrash
              className="delete-icon"
              onClick={() => handleDeleteSubject(sub)}
            />
          </div>
        ))}
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Result
      </button>
    </div>
  );
}
