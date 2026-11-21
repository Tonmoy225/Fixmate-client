"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error({ error, reset }) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl text-error">
        <FaExclamationTriangle />
      </span>

      <h1 className="mt-6 text-3xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-slate-500">
        We could not load this page. Please try again, or go back to the home page.
      </p>

      <div className="mt-8 flex gap-4">
        <button onClick={() => reset()} className="btn btn-fixmate">
          Try Again
        </button>
        <Link href="/" className="btn btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}