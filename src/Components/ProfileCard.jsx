import { IoClose } from "react-icons/io5";

function ProfileCard({ student, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200,
        padding: "10px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "360px",
          position: "relative",
          padding: "20px",
        }}
      >
        {/* Close Button */}
        <IoClose
          size={24}
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            cursor: "pointer",
          }}
        />

        {/* Student Photo */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <img
            src={student.photo}
            alt="Student"
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #eee",
            }}
          />
        </div>

        {/* Student Details */}
        <div style={{ fontSize: "14px", lineHeight: "1.8" }}>
          <Detail label="Full Name" value={student.name} />
          <Detail label="Father's Name" value={student.fatherName} />
          <Detail label="Mobile Number" value={student.mobile} />
          <Detail label="Email" value={student.email || "Not Provided"} />
          <Detail
            label="Class"
            value={`${student.class} - ${student.section}`}
          />
          <Detail label="Roll No" value={student.roll} />
        </div>
      </div>
    </div>
  );
}

/* Small reusable row */
function Detail({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
        padding: "6px 0",
      }}
    >
      <span style={{ fontWeight: "600" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default ProfileCard;
