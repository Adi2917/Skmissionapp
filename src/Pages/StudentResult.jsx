import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./StudentResult.css";

export default function StudentResult() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [examName, setExamName] = useState("");

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    const { data } = await supabase
      .from("results")
      .select(`
        *,
        exam_types(name)
      `)
      .eq("student_id", id);

    if (data && data.length > 0) {
      setResults(data);
      setExamName(data[0].exam_types.name);
    }
  };

  const total = results.reduce((sum, r) => sum + r.marks, 0);
  const percentage = results.length
    ? (total / (results.length * 100)) * 100
    : 0;

  const getGrade = () => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    return "D";
  };

  return (
    <div className="result-wrapper">
      <div className="result-card">
        <img src="/logo.png" className="logo" alt="logo" />
        <h2>SK Mission School</h2>
        <h3>{examName}</h3>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{r.subject}</td>
                <td>{r.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary">
          <p>Total: {total}</p>
          <p>Percentage: {percentage.toFixed(2)}%</p>
          <p>Grade: {getGrade()}</p>
        </div>

        <button onClick={() => window.print()} className="print-btn">
          Print / Save PDF
        </button>

        <p className="contact">
          Contact: 8116360090
        </p>
      </div>
    </div>
  );
}
