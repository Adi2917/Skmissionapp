import React from "react";

export default function ClassButtons({ classes, selectedClass, setSelectedClass, setSelectedSection, setStudents }) {
  return (
    <div className="class-section">
      {classes.map((cls) => (
        <button
          key={cls}
          className={`class-btn ${selectedClass === cls ? "active" : ""}`}
          onClick={() => {
            setSelectedClass(cls);
            setSelectedSection(null);
            setStudents([]);
          }}
        >
          {cls}
        </button>
      ))}
    </div>
  );
}
