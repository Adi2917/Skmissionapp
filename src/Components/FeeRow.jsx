function FeeRow({ month, status, date }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #eee",
      }}
    >
      <span>{month}</span>

      <span
        style={{
          color: status === "Paid" ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {status}
        {status === "Paid" && date ? ` (${date})` : ""}
      </span>
    </div>
  );
}

export default FeeRow;
