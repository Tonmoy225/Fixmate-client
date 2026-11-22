import Gear from "./Gear";

export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="relative h-16 w-20">
        <Gear
          maskId="page-big"
          spin="cw"
          duration={3}
          className="absolute left-0 top-0 h-14 w-14 text-primary"
        />
        <Gear
          maskId="page-small"
          spin="ccw"
          duration={1.8}
          className="absolute bottom-0 right-0 h-9 w-9 text-secondary"
        />
      </div>
      <p className="animate-pulse text-sm font-semibold text-slate-500">{text}</p>
    </div>
  );
}