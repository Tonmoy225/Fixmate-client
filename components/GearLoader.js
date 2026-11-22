import Gear from "./Gear";

export default function GearLoader({ text = "Fixing things for you..." }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      {/* দুটো gear উল্টো দিকে ঘুরছে */}
      <div className="relative h-24 w-28">
        <Gear
          maskId="loader-big"
          className="gear-spin absolute left-0 top-0 h-20 w-20 text-primary"
        />
        <Gear
          maskId="loader-small"
          className="gear-spin-reverse absolute bottom-0 right-0 h-12 w-12 text-secondary"
        />
      </div>

      <p className="font-brand text-2xl uppercase tracking-wider text-secondary">
        Fix<span className="text-primary">Mate</span>
      </p>
      <p className="animate-pulse font-semibold text-slate-500">{text}</p>
    </div>
  );
}