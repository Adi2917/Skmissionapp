import "./StudentChoice.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function StudentChoice() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const studentData = localStorage.getItem("studentData");
    if (studentData) {
      // Already logged in → direct dashboard
      navigate("/StudentDashboard");
    } else {
      // Not logged in → go to login page
      navigate("/StudentLogin");
    }
  };

  return (
    <div className="choice-container">
      <div className="choice-bg-glow"></div>

      <div className="choice-card">
        <div className="choice-logo">
          <img src={logo} alt="SK Mission School" />
        </div>

        <h1 className="choice-title">
          Student Portal
        </h1>

        <p className="choice-desc">
          Register as a new student or login to access your dashboard securely.
        </p>

        <div className="choice-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/StudentRegister")}
          >
            Create New Account
          </button>

          <button
            className="btn-outline"
            onClick={handleLoginClick}
          >
            Login to Existing Account
          </button>
        </div>

        <div className="choice-divider"></div>

        <p className="choice-footer">
          © {new Date().getFullYear()} SK Mission School
        </p>
      </div>
    </div>
  );
}
