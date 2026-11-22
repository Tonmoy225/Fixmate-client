const statusStyle = {
  requested: "bg-blue-100 text-blue-700",
  accepted: "bg-indigo-100 text-indigo-700",
  "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-slate-200 text-slate-600",
};

const statusLabel = {
  requested: "Requested",
  accepted: "Accepted",
  "in-progress": "In Progress",
  completed: "Completed",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
    >
      {statusLabel[status] || status}
    </span>
  );
}

export function PaymentBadge({ paymentStatus }) {
  const paid = paymentStatus === "paid";
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        paid ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
      }`}
    >
      {paid ? "Paid" : "Unpaid"}
    </span>
  );
}