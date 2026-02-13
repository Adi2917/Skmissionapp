import { IoCash, IoDocumentText, IoNotifications } from "react-icons/io5";

function BottomNav({ onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        borderTop: "1px solid #ddd",
        padding: "10px 0",
        background: "#fff",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <div onClick={() => onSelect("fees")} style={{ textAlign: "center" }}>
        <IoCash size={22} />
        <div>Fees</div>
      </div>

      <div onClick={() => onSelect("result")} style={{ textAlign: "center" }}>
        <IoDocumentText size={22} />
        <div>Result</div>
      </div>

      <div
        onClick={() => onSelect("notification")}
        style={{ textAlign: "center" }}
      >
        <IoNotifications size={22} />
        <div>Notice</div>
      </div>
    </div>
  );
}

export default BottomNav;
