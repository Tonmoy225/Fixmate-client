"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StatusBadge, PaymentBadge } from "@/components/dashboard/StatusBadge";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import { apiFetch } from "@/lib/api";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(null);
  const [cancelId, setCancelId] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [payingId, setPayingId] = useState(null);

  const loadBookings = () => {
    apiFetch("/api/bookings/my")
      .then(setBookings)
      .catch((error) => {
        toast.error(error.message);
        setBookings([]);
      });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await apiFetch(`/api/bookings/${cancelId}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled");
      setCancelId(null);
      loadBookings();
    } catch (error) {
      toast.error(error.message);
    }
    setCancelling(false);
  };

  // server Stripe checkout বানায়, তারপর customer-কে Stripe page-এ পাঠানো হয়
  const handlePay = async (booking) => {
    setPayingId(booking._id);
    try {
      const data = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ bookingId: booking._id }),
      });
      window.location.href = data.url;
    } catch (error) {
      toast.error(error.message);
      setPayingId(null);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  // completed হলে final amount, নইলে base price
  const amountText = (booking) =>
    booking.status === "completed"
      ? `$${booking.finalAmount}`
      : `$${booking.basePrice} (base)`;

  // table আর mobile card দুই জায়গায় একই বাটন
  const Actions = ({ booking }) => (
    <div className="flex flex-wrap items-center gap-2">
      {booking.status === "requested" && (
        <button
          onClick={() => setCancelId(booking._id)}
          className="btn btn-outline btn-error btn-sm"
        >
          Cancel
        </button>
      )}
      {booking.status === "completed" && booking.paymentStatus === "unpaid" && (
        <button
          onClick={() => handlePay(booking)}
          disabled={payingId === booking._id}
          className="btn btn-fixmate btn-sm"
        >
          {payingId === booking._id ? "Redirecting..." : "Pay Now"}
        </button>
      )}
      {booking.paymentStatus === "paid" && <PaymentBadge paymentStatus="paid" />}
    </div>
  );

  if (!bookings) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">My Bookings</h1>
      <p className="mb-6 text-slate-500">Track all your repair requests</p>

      {bookings.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No bookings yet</p>
          <p className="mt-2 text-slate-500">
            Find a service and send your first repair request.
          </p>
          <Link href="/services" className="btn btn-fixmate mt-6">
            Browse Services
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md md:block">
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Technician</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
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
                    <td>{booking.technicianName}</td>
                    <td className="whitespace-nowrap">{formatDate(booking.preferredDate)}</td>
                    <td className="whitespace-nowrap">{amountText(booking)}</td>
                    <td>
                      <StatusBadge status={booking.status} />
                    </td>
                    <td>
                      <PaymentBadge paymentStatus={booking.paymentStatus} />
                    </td>
                    <td>
                      <Actions booking={booking} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 md:hidden">
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
                    <p className="text-sm text-slate-500">{booking.technicianName}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={booking.status} />
                  <PaymentBadge paymentStatus={booking.paymentStatus} />
                </div>

                <div className="mt-3 flex justify-between text-sm text-slate-600">
                  <span>{formatDate(booking.preferredDate)}</span>
                  <span className="font-semibold">{amountText(booking)}</span>
                </div>

                <div className="mt-3">
                  <Actions booking={booking} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {cancelId && (
        <ConfirmModal
          title="Cancel this booking?"
          message="Your repair request will be cancelled. This cannot be undone."
          confirmText="Yes, Cancel"
          loading={cancelling}
          onConfirm={handleCancel}
          onCancel={() => setCancelId(null)}
        />
      )}
    </div>
  );
}