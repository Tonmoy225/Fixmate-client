"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RequestRepair({ serviceId }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <button className="btn w-full" disabled>
        Loading...
      </button>
    );
  }

  // লগইন না থাকলে sign-in এ, লগইনের পর এই page-এ ফিরে আসবে
  if (!user) {
    return (
      <Link
        href={`/sign-in?redirect=/services/${serviceId}`}
        className="btn btn-fixmate w-full"
      >
        Request Repair
      </Link>
    );
  }

  // technician বা admin হলে বন্ধ
  if (user.role !== "customer") {
    return (
      <div>
        <button className="btn w-full" disabled>
          Request Repair
        </button>
        <p className="mt-2 text-center text-sm text-slate-500">
          Only customers can request a repair
        </p>
      </div>
    );
  }

  // customer: form পরের commit-এ যোগ হবে
  return (
    <button
      className="btn btn-fixmate w-full"
      onClick={() => toast("Request form will be added in the next step")}
    >
      Request Repair
    </button>
  );
}