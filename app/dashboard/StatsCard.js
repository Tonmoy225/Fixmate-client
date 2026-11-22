export default function StatsCard({ title, value, icon, color = "bg-primary" }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md">
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl text-white ${color}`}
      >
        {icon}
      </span>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}