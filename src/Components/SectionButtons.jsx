import React from "react";

export default function SectionButtons({ sections, selectedSection, setSelectedSection }) {
  return (
    <div className="section-row">
      {sections.map((sec) => (
        <button
          key={sec}
          className={`section-btn ${selectedSection === sec ? "active" : ""}`}
          onClick={() => setSelectedSection(sec)}
        >
          {sec}
        </button>
      ))}
    </div>
  );
}
