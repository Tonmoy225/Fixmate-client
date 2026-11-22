"use client";

import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdPayments } from "react-icons/md";
import StatsCard from "@/components/dashboard/StatsCard";
import { apiFetch } from "@/lib/api";

export default function TransactionsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiFetch("/api/admin/payments")
      .then(setData)
      .catch((error) => {
        toast.error(error.message);
        setData({ payments: [], totalRevenue: 0 });
      });
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  if (!data) {
    return (
      <PageLoader />
    );
  }

  const { payments, totalRevenue } = data;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Transactions</h1>
      <p className="mb-6 text-slate-500">All payments received through Stripe</p>

      {/* Total revenue table-এর উপরে */}
      <div className="mb-6 max-w-sm">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
          icon={<MdPayments />}
          color="bg-green-500"
        />
      </div>

      {payments.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No transactions yet</p>
          <p className="mt-2 text-slate-500">
            Payments will appear here when customers pay for completed jobs.
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
                  <th>Technician</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Paid On</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>
                      <p>{payment.customerName}</p>
                      <p className="text-sm text-slate-500">{payment.customerEmail}</p>
                    </td>
                    <td>{payment.technicianName}</td>
                    <td className="font-semibold">{payment.serviceTitle}</td>
                    <td className="font-semibold text-green-600">${payment.amount}</td>
                    <td className="max-w-[200px] break-all text-xs">{payment.transactionId}</td>
                    <td className="whitespace-nowrap">{formatDate(payment.paidAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile + tablet cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {payments.map((payment) => (
              <div key={payment._id} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold">{payment.serviceTitle}</p>
                  <p className="font-extrabold text-green-600">${payment.amount}</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold">Customer:</span> {payment.customerName}
                  </p>
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