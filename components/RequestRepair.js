"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function RequestRepair({ serviceId }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    phone: "",
    address: "",
    preferredDate: "",
    problemDescription: "",
  });

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

  const openForm = () => {
    // আজকের তারিখ (নিজের timezone অনুযায়ী) বের করা
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setMinDate(local.toISOString().split("T")[0]);
    setSubmitted(false);
    setOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.preferredDate) {
      newErrors.preferredDate = "Preferred date is required";
    } else if (form.preferredDate < minDate) {
      newErrors.preferredDate = "Date must be today or a future date";
    }

    if (form.problemDescription.trim().length < 20) {
      newErrors.problemDescription =
        "Problem description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({ serviceId, ...form }),
      });
      toast.success("Repair request sent successfully!");
      setSubmitted(true);
      setForm({ phone: "", address: "", preferredDate: "", problemDescription: "" });
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <button className="btn btn-fixmate w-full" onClick={openForm}>
        Request Repair
      </button>

      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box max-h-[90vh] max-w-lg overflow-y-auto">
            {submitted ? (
              /* সফল হওয়ার পর */
              <div className="py-6 text-center">
                <p className="text-5xl">✅</p>
                <h3 className="mt-4 text-2xl font-extrabold">Request Sent!</h3>
                <p className="mt-2 text-slate-500">
                  The technician will review your request soon.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link href="/dashboard/customer/bookings" className="btn btn-fixmate">
                    My Bookings
                  </Link>
                  <button className="btn btn-outline" onClick={() => setOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-extrabold">Request Repair</h3>
                <p className="mb-4 text-sm text-slate-500">
                  Fill in the details so the technician can help you.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-semibold">Name</label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="input input-bordered w-full"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-error">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House, road, area"
                      className="input input-bordered w-full"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-error">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      min={minDate}
                      value={form.preferredDate}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-sm text-error">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold">
                      Problem Description
                    </label>
                    <textarea
                      name="problemDescription"
                      value={form.problemDescription}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe what is wrong with your device (min 20 characters)"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.problemDescription && (
                      <p className="mt-1 text-sm text-error">
                        {errors.problemDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="btn btn-fixmate">
                      {loading ? "Sending..." : "Send Request"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}