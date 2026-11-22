"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { apiFetch } from "@/lib/api";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Payment session not found");
      return;
    }

    // server Stripe-এ যাচাই করে payment save করে (বারবার ডাকলেও একবারই save হয়)
    apiFetch(`/api/payments/verify?session_id=${sessionId}`)
      .then((data) => {
        setPayment(data);
        toast.success("Payment successful!");
      })
      .catch((err) => setError(err.message));
  }, [sessionId]);

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <FaTimesCircle className="mx-auto text-6xl text-error" />
        <h1 className="mt-4 text-2xl font-extrabold">Could not verify payment</h1>
        <p className="mt-2 text-slate-500">{error}</p>
        <Link href="/dashboard/customer/bookings" className="btn btn-fixmate mt-6">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="font-semibold text-slate-500">Confirming your payment...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
      <FaCheckCircle className="mx-auto text-6xl text-success" />
      <h1 className="mt-4 text-2xl font-extrabold">Payment Successful</h1>
      <p className="mt-2 text-slate-500">Thank you! Your repair is paid.</p>

      <div className="mt-6 space-y-3 rounded-xl bg-base-200 p-4 text-left text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Service</span>
          <span className="font-semibold">{payment.serviceTitle}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Amount</span>
          <span className="font-extrabold text-green-600">${payment.amount}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">Transaction ID</span>
          <span className="break-all text-right text-xs font-semibold">
            {payment.transactionId}
          </span>
        </div>
      </div>

      <Link href="/dashboard/customer/bookings" className="btn btn-fixmate mt-6 w-full">
        Back to My Bookings
      </Link>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="container-page py-16">
      <Suspense>
        <SuccessContent />
      </Suspense>
    </div>
  );
}