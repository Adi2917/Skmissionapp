import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./StudentLogin.css";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 2500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (number.length !== 10)
      return showPopup("error", "Enter valid 10 digit number");

    if (pin.length !== 4)
      return showPopup("error", "Enter valid 4 digit PIN");

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("number", number)
        .eq("pin", pin)
        .single();

      setLoading(false);

      if (error || !data) {
        return showPopup("error", "Invalid Credentials");
      }

      // ✅ Save student data locally (optional but useful)
      localStorage.setItem("studentData", JSON.stringify(data));

      showPopup("success", "Login Successful 🎉");

      setTimeout(() => {
        navigate("/StudentDashboard");
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      showPopup("error", "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.type}`}>
            {popup.message}
          </div>
        </div>
      )}

      <div className="login-card">
        <h2>Student Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Registered Number"
            value={number}
            onChange={(e) => {
              if (!/^\d*$/.test(e.target.value)) return;
              if (e.target.value.length > 10) return;
              setNumber(e.target.value);
            }}
            required
          />

          <input
            type="password"
            placeholder="Enter 4 Digit PIN"
            value={pin}
            onChange={(e) => {
              if (!/^\d*$/.test(e.target.value)) return;
              if (e.target.value.length > 4) return;
              setPin(e.target.value);
            }}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}