"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdPeople, MdEngineering, MdPendingActions } from "react-icons/md";
import StatsCard from "@/components/dashboard/StatsCard";
import { apiFetch } from "@/lib/api";


import BookingsChart from "@/components/dashboard/BookingsChart";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiFetch("/api/admin/stats")
      .then(setStats)
      .catch(() => {
        toast.error("Failed to load stats");
        setStats({ totalUsers: 0, totalTechnicians: 0, pendingServices: 0, bookingsByStatus: {} });
      });
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Admin Overview</h1>
      <p className="mb-6 text-slate-500">A quick look at the whole platform</p>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard title="Total Users" value={stats.totalUsers} icon={<MdPeople />} color="bg-blue-500" />
        <StatsCard title="Total Technicians" value={stats.totalTechnicians} icon={<MdEngineering />} color="bg-orange-500" />
        <StatsCard title="Pending Services" value={stats.pendingServices} icon={<MdPendingActions />} color="bg-amber-500" />
      </div>

      <BookingsChart bookingsByStatus={stats.bookingsByStatus} />
    </div>
  );
}