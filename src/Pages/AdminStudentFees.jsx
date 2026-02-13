import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./AdminStudentFees.css";

const monthsOrder = [
  "March","April","May","June","July","August",
  "September","October","November","December",
  "January","February"
];

export default function AdminStudentFees() {
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

    if (!data || data.length === 0) {
      const insertData = monthsOrder.map((month) => ({
        student_id: id,
        month,
        status: "Pending",
        paid_date: null
      }));

      await supabase.from("fees").insert(insertData);
      fetchFees();
    } else {
      // Sort manually according to session order
      const sorted = monthsOrder.map(month =>
        data.find(f => f.month === month)
      ).filter(Boolean);

      setFees(sorted);
    }
  };

  const updateStatus = async (feeId, newStatus) => {
    const today = new Date().toISOString();

    await supabase
      .from("fees")
      .update({
        status: newStatus,
        paid_date: newStatus === "Paid" ? today : null
      })
      .eq("id", feeId);

    fetchFees();
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-card">

        <h2>Manage Student Fees</h2>

        {fees.map((fee) => (
          <div key={fee.id} className="admin-row">

            <div className="month-name">
              {fee.month}
            </div>

            <div className="right-section">

              <span
                className={`status-dot ${
                  fee.status === "Paid" ? "green" : "red"
                }`}
              ></span>

              <select
                value={fee.status}
                onChange={(e) =>
                  updateStatus(fee.id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>

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
