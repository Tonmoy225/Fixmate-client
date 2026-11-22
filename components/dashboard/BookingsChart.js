"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const statusInfo = {
  requested: { label: "Requested", color: "#3b82f6" },
  accepted: { label: "Accepted", color: "#6366f1" },
  "in-progress": { label: "In Progress", color: "#f59e0b" },
  completed: { label: "Completed", color: "#22c55e" },
  rejected: { label: "Rejected", color: "#ef4444" },
  cancelled: { label: "Cancelled", color: "#94a3b8" },
};

export default function BookingsChart({ bookingsByStatus }) {
  const data = Object.keys(statusInfo).map((status) => ({
    name: statusInfo[status].label,
    count: bookingsByStatus?.[status] || 0,
    color: statusInfo[status].color,
  }));

  const total = data.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white py-12 text-center shadow-md">
        <p className="text-xl font-bold">No booking data yet</p>
        <p className="mt-1 text-slate-500">Charts will appear when bookings are made.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Bar chart */}
      <div className="rounded-2xl bg-white p-5 shadow-md">
        <h2 className="mb-4 text-lg font-bold">Bookings by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart: শুধু যে status-এ booking আছে */}
      <div className="rounded-2xl bg-white p-5 shadow-md">
        <h2 className="mb-4 text-lg font-bold">Booking Share</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.filter((item) => item.count > 0)}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {data
                .filter((item) => item.count > 0)
                .map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}