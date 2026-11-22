"use client";

import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdBuild, MdVerified, MdPendingActions } from "react-icons/md";
import StatsCard from "@/components/dashboard/StatsCard";
import { apiFetch } from "@/lib/api";

export default function TechnicianOverview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/services/mine"),
      apiFetch("/api/bookings/technician"),
    ])
      .then(([services, bookings]) => setData({ services, bookings }))
      .catch((error) => {
        toast.error(error.message);
        setData({ services: [], bookings: [] });
      });
  }, []);

  if (!data) {
    return (
      <PageLoader />
    );
  }

  const totalServices = data.services.length;
  const approvedServices = data.services.filter(
    (service) => service.approvalStatus === "approved"
  ).length;
  const pendingRequests = data.bookings.filter(
    (booking) => booking.status === "requested"
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Technician Overview</h1>
      <p className="mb-6 text-slate-500">A quick look at your services and jobs</p>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard title="Total Services" value={totalServices} icon={<MdBuild />} color="bg-blue-500" />
        <StatsCard title="Approved Services" value={approvedServices} icon={<MdVerified />} color="bg-green-500" />
        <StatsCard title="Pending Requests" value={pendingRequests} icon={<MdPendingActions />} color="bg-amber-500" />
      </div>
    </div>
  );
}