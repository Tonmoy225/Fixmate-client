"use client";

import { useState } from "react";

export default function FinalAmountModal({ booking, loading, onConfirm, onCancel }) {
  // আগে থেকে base price বসানো থাকবে
  const [amount, setAmount] = useState(booking.basePrice);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(Number(amount) > 0)) {
      setError("Final amount must be a number greater than 0");
      return;
    }

    setError("");
    onConfirm(Number(amount));
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-extrabold">Mark Job as Completed</h3>
        <p className="mt-2 text-sm text-slate-500">
          {booking.serviceTitle} for {booking.customerName}. The customer will
          pay this amount.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-4">
          <label className="mb-1 block text-sm font-semibold">Final Amount (USD)</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
          />
          {error && <p className="mt-1 text-sm text-error">{error}</p>}

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-fixmate" disabled={loading}>
              {loading ? "Saving..." : "Mark Completed"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}