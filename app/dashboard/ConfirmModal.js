export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-xl font-extrabold">{title}</h3>
        <p className="mt-3 text-slate-600">{message}</p>
        <div className="modal-action">
          <button className="btn btn-outline" onClick={onCancel} disabled={loading}>
            No, Go Back
          </button>
          <button className="btn btn-error text-white" onClick={onConfirm} disabled={loading}>
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}