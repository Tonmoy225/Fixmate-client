"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdListAlt, MdPendingActions, MdTaskAlt } from "react-icons/md";
import StatsCard from "@/components/dashboard/StatsCard";
import { apiFetch } from "@/lib/api";

export default function CustomerOverview() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    apiFetch("/api/bookings/my")
      .then(setBookings)
      .catch((error) => {
        toast.error(error.message);
        setBookings([]);
      });
  }, []);

  if (!bookings) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const total = bookings.length;
  const active = bookings.filter((b) =>
    ["requested", "accepted", "in-progress"].includes(b.status)
  ).length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Customer Overview</h1>
      <p className="mb-6 text-slate-500">A quick look at your repair requests</p>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard title="Total Requests" value={total} icon={<MdListAlt />} color="bg-blue-500" />
        <StatsCard title="Active Jobs" value={active} icon={<MdPendingActions />} color="bg-amber-500" />
        <StatsCard title="Completed Jobs" value={completed} icon={<MdTaskAlt />} color="bg-green-500" />
      </div>
    </div>
  );
}