"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const roleBadgeClass = {
  customer: "bg-blue-100 text-blue-700",
  technician: "bg-orange-100 text-orange-700",
  admin: "bg-purple-100 text-purple-700",
};

export default function UserMenu({ user }) {
  const router = useRouter();
  const role = user.role || "customer";

  // মেনুর কোনো লিংকে ক্লিক করলে dropdown বন্ধ করার জন্য
  const closeMenu = () => {
    document.activeElement?.blur();
  };

  const handleSignOut = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="cursor-pointer">
        {user.image ? (
          <img
            src={user.image}
            alt="profile"
            className="h-10 w-10 rounded-full border-2 border-primary object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-64 rounded-xl bg-white p-3 text-slate-800 shadow-xl"
      >
        <li className="border-b border-slate-200 px-2 pb-3">
          <p className="font-bold">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleBadgeClass[role]}`}
          >
            {role}
          </span>
        </li>

        <li className="mt-2">
          <Link
            href={`/dashboard/${role}`}
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/profile"
            onClick={closeMenu}
            className="block rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            Update Profile
          </Link>
        </li>
        <li>
          <button
            onClick={handleSignOut}
            className="block w-full rounded-lg px-3 py-2 text-left text-error hover:bg-red-50"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}