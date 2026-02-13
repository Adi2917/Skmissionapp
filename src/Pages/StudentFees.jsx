import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./StudentFees.css";

const monthsOrder = [
  "March","April","May","June","July","August",
  "September","October","November","December",
  "January","February"
];

export default function StudentFees() {
  const { id } = useParams();
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, [id]);

  const fetchFees = async () => {
    const { data } = await supabase
      .from("fees")
      .select("*")
      .eq("student_id", id);

    if (data) {
      const sorted = monthsOrder.map(month =>
        data.find(f => f.month === month)
      ).filter(Boolean);

      setFees(sorted);
    }
  };

  return (
    <div className="student-wrapper">
      <div className="student-card">

        <h2>My Fees Status</h2>

        {fees.map((fee) => (
          <div key={fee.id} className="student-row">

            <div className="month-name">
              {fee.month}
            </div>

            <div className="right-section">

              <span
                className={`status-dot ${
                  fee.status === "Paid" ? "green" : "red"
                }`}
              ></span>

              <span>{fee.status}</span>

              {fee.status === "Paid" && fee.paid_date && (
                <span className="paid-date">
                  {new Date(fee.paid_date).toLocaleDateString()}
                </span>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
