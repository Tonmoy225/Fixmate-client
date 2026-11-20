import Link from "next/link";
import { FaWrench } from "react-icons/fa";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
        <FaWrench />
      </span>
      <span className="text-2xl font-extrabold text-white">
        Fix<span className="text-primary">Mate</span>
      </span>
    </Link>
  );
}