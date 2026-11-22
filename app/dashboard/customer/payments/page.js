"use client";

import PageLoader from "@/components/PageLoader";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    apiFetch("/api/payments/my")
      .then(setPayments)
      .catch((error) => {
        toast.error(error.message);
        setPayments([]);
      });
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  if (!payments) {
    return (
      <PageLoader />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Payment History</h1>
      <p className="mb-6 text-slate-500">All the repairs you have paid for</p>

      {payments.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No payments yet</p>
          <p className="mt-2 text-slate-500">
            When you pay for a completed job, it will appear here.
          </p>
          <Link href="/dashboard/customer/bookings" className="btn btn-fixmate mt-6">
            Go to My Bookings
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
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Paid On</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="font-semibold">{payment.serviceTitle}</td>
                    <td>{payment.technicianName}</td>
                    <td className="font-semibold text-green-600">${payment.amount}</td>
                    <td className="max-w-[220px] break-all text-xs">{payment.transactionId}</td>
                    <td className="whitespace-nowrap">{formatDate(payment.paidAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 md:hidden">
            {payments.map((payment) => (
              <div key={payment._id} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold">{payment.serviceTitle}</p>
                  <p className="font-extrabold text-green-600">${payment.amount}</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold">Technician:</span> {payment.technicianName}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {formatDate(payment.paidAt)}
                  </p>
                  <p className="break-all text-xs">
                    <span className="font-semibold">Transaction:</span> {payment.transactionId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}