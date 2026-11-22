"use client";

import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StatusBadge, PaymentBadge } from "@/components/dashboard/StatusBadge";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import FinalAmountModal from "@/components/dashboard/FinalAmountModal";
import { apiFetch } from "@/lib/api";

const filters = [
  { label: "All", value: "" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export default function RequestsPage() {
  const [bookings, setBookings] = useState(null);
  const [filter, setFilter] = useState("");
  const [rejectBooking, setRejectBooking] = useState(null);
  const [completeBooking, setCompleteBooking] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reload, setReload] = useState(0);

  // filter বদলালে বা কাজ শেষ হলে server থেকে আবার আনা (filter server-এ হয়)
  useEffect(() => {
    const query = filter ? `?status=${filter}` : "";
    apiFetch(`/api/bookings/technician${query}`)
      .then(setBookings)
      .catch((error) => {
        toast.error(error.message);
        setBookings([]);
      });
  }, [filter, reload]);

  const updateStatus = async (booking, status, finalAmount) => {
    setSaving(true);
    try {
      await apiFetch(`/api/bookings/${booking._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status, finalAmount }),
      });

      const messages = {
        accepted: "Request accepted",
        rejected: "Request rejected",
        "in-progress": "Work started",
        completed: "Job marked as completed",
      };
      toast.success(messages[status]);

      setRejectBooking(null);
      setCompleteBooking(null);
      setReload((value) => value + 1);
    } catch (error) {
      toast.error(error.message);
    }
    setSaving(false);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  // শুধু ওই status-এর জন্য ঠিক বাটনগুলো
  const Actions = ({ booking }) => {
    if (booking.status === "requested") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => updateStatus(booking, "accepted")}
            disabled={saving}
            className="btn btn-success btn-sm text-white"
          >
            Accept
          </button>
          <button
            onClick={() => setRejectBooking(booking)}
            className="btn btn-outline btn-error btn-sm"
          >
            Reject
          </button>
        </div>
      );
    }

    if (booking.status === "accepted") {
      return (
        <button
          onClick={() => updateStatus(booking, "in-progress")}
          disabled={saving}
          className="btn btn-fixmate btn-sm"
        >
          Start Work
        </button>
      );
    }

    if (booking.status === "in-progress") {
      return (
        <button
          onClick={() => setCompleteBooking(booking)}
          className="btn btn-fixmate btn-sm"
        >
          Mark Completed
        </button>
      );
    }

    // completed হলে payment badge, rejected আর cancelled-এ কোনো action নেই
    if (booking.status === "completed") {
      return <PaymentBadge paymentStatus={booking.paymentStatus} />;
    }

    return <span className="text-slate-400">—</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Manage Requests</h1>
      <p className="mb-6 text-slate-500">Update the status of your repair jobs</p>

      {/* Status filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setBookings(null);
              setFilter(item.value);
            }}
            className={
              filter === item.value
                ? "btn btn-fixmate btn-sm"
                : "btn btn-outline btn-sm"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      {!bookings ? (
        <PageLoader />
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No requests found</p>
          <p className="mt-2 text-slate-500">
            {filter
              ? "There are no requests with this status."
              : "New repair requests from customers will appear here."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Problem</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <p className="font-semibold">{booking.customerName}</p>
                      <p className="text-sm text-slate-500">{booking.customerPhone}</p>
                    </td>
                    <td className="font-semibold">{booking.serviceTitle}</td>
                    <td className="max-w-[180px] text-sm">{booking.address}</td>
                    <td className="whitespace-nowrap">{formatDate(booking.preferredDate)}</td>
                    <td className="max-w-[220px] text-sm text-slate-600">
                      {booking.problemDescription}
                    </td>
                    <td>
                      <StatusBadge status={booking.status} />
                    </td>
                    <td>
                      <Actions booking={booking} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile + tablet cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {bookings.map((booking) => (
              <div key={booking._id} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold">{booking.serviceTitle}</p>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold">Customer:</span> {booking.customerName}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {booking.customerPhone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> {booking.address}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {formatDate(booking.preferredDate)}
                  </p>
                  <p>
                    <span className="font-semibold">Problem:</span> {booking.problemDescription}
                  </p>
                </div>

                <div className="mt-4">
                  <Actions booking={booking} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {rejectBooking && (
        <ConfirmModal
          title="Reject this request?"
          message={`The request from ${rejectBooking.customerName} will be rejected. This cannot be undone.`}
          confirmText="Yes, Reject"
          loading={saving}
          onConfirm={() => updateStatus(rejectBooking, "rejected")}
          onCancel={() => setRejectBooking(null)}
        />
      )}

      {completeBooking && (
        <FinalAmountModal
          booking={completeBooking}
          loading={saving}
          onConfirm={(amount) => updateStatus(completeBooking, "completed", amount)}
          onCancel={() => setCompleteBooking(null)}
        />
      )}
    </div>
  );
}