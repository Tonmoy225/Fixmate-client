export default function Spinner() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="font-semibold text-slate-500">Loading...</p>
    </div>
  );
}