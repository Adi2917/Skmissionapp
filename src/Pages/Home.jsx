import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="glass-card">

        <div className="logo-wrap">
          <img src={logo} alt="SK Mission School" />
        </div>

        <h1 className="title">
          SK Mission
          <span>School</span>
        </h1>

        <p className="subtitle">
          Smart Student Management System
        </p>

        <div className="button-group">
          <button
            className="btn-main"
            onClick={() => navigate("/StudentChoice")}
          >
            Enter Student Portal
          </button>

          <button
            className="btn-alt"
            onClick={() => navigate("/AdminLogin")}
          >
            Admin Access
          </button>
        </div>
      </div>

      <div className="floating-contact">
        <a href="mailto:info@skmission.com">
          <FaEnvelope />
        </a>
        <a href="https://wa.me/8116360090" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
        <a href="tel:+8116360090">
          <FaPhone />
        </a>
      </div>
    </div>
  );
};

export default Home;
