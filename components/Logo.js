import Link from "next/link";
import Gear from "./Gear";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-orange-500/30">
        <Gear className="h-7 w-7 text-white transition-transform duration-700 group-hover:rotate-180" />
      </span>
      <span className="font-brand text-2xl uppercase tracking-wider text-white">
        Fix<span className="text-primary">Mate</span>
      </span>
    </Link>
  );
}