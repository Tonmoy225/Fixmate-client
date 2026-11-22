"use client";

import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StatusBadge, PaymentBadge } from "@/components/dashboard/StatusBadge";
import { apiFetch } from "@/lib/api";

const filters = [
  { label: "All", value: "" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(null);
  const [filter, setFilter] = useState("");

  // filter server-এ হয়
  useEffect(() => {
    const query = filter ? `?status=${filter}` : "";
    apiFetch(`/api/admin/bookings${query}`)
      .then(setBookings)
      .catch((error) => {
        toast.error(error.message);
        setBookings([]);
      });
  }, [filter]);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  const amountText = (booking) =>
    booking.status === "completed"
      ? `$${booking.finalAmount}`
      : `$${booking.basePrice}`;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">All Bookings</h1>
      <p className="mb-6 text-slate-500">Every repair job on the platform</p>

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
          <p className="text-2xl font-bold">No bookings found</p>
          <p className="mt-2 text-slate-500">There are no bookings with this status.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Customer</th>
                  <th>Technician</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.serviceImage}
                          alt={booking.serviceTitle}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <span className="font-semibold">{booking.serviceTitle}</span>
                      </div>
                    </td>
                    <td>
                      <p>{booking.customerName}</p>
                      <p className="text-sm text-slate-500">{booking.customerEmail}</p>
                    </td>
                    <td>{booking.technicianName}</td>
                    <td className="whitespace-nowrap">{formatDate(booking.preferredDate)}</td>
                    <td>
                      <StatusBadge status={booking.status} />
                    </td>
                    <td>
                      <PaymentBadge paymentStatus={booking.paymentStatus} />
                    </td>
                    <td className="font-semibold">{amountText(booking)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile + tablet cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {bookings.map((booking) => (
              <div key={booking._id} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={booking.serviceImage}
                    alt={booking.serviceTitle}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold">{booking.serviceTitle}</p>
                    <p className="text-sm text-slate-500">{formatDate(booking.preferredDate)}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold">Customer:</span> {booking.customerName}
                  </p>
                  <p>
                    <span className="font-semibold">Technician:</span> {booking.technicianName}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> {amountText(booking)}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <StatusBadge status={booking.status} />
                  <PaymentBadge paymentStatus={booking.paymentStatus} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}