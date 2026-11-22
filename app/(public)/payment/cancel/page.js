import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentCancelPage() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <FaTimesCircle className="mx-auto text-6xl text-warning" />
        <h1 className="mt-4 text-2xl font-extrabold">Payment Cancelled</h1>
        <p className="mt-2 text-slate-500">
          No money was taken. You can try again whenever you are ready.
        </p>
        <Link href="/dashboard/customer/bookings" className="btn btn-fixmate mt-6 w-full">
          Try Again
        </Link>
      </div>
    </div>
  );
}