"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { menuByRole } from "@/lib/dashboard-menu";
import Logo from "./Logo";

const roleBadgeClass = {
  customer: "bg-blue-100 text-blue-700",
  technician: "bg-orange-100 text-orange-700",
  admin: "bg-purple-100 text-purple-700",
};

export default function DashboardShell({ user: initialUser, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // profile update করলে নাম আর ছবি সাথে সাথে বদলাবে
  const { data } = authClient.useSession();
  const user = data?.user || initialUser;
  const role = user.role || "customer";
  const menu = menuByRole[role];

  const isActive = (href) => {
    // Overview শুধু হুবহু মিললে active, বাকিগুলো শুরু মিললেই
    if (href === `/dashboard/${role}`) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-secondary transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo />
          <button
            className="text-2xl text-white lg:hidden"
            onClick={() => setOpen(false)}
          >
            <HiX />
          </button>
        </div>

        <p className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {role} panel
        </p>

        <nav className="flex-1 space-y-1 px-3">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium ${
                isActive(item.href)
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <FaSignOutAlt className="text-xl" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Right side: top bar + page */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="text-3xl text-secondary lg:hidden"
              onClick={() => setOpen(true)}
            >
              <HiMenu />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-slate-600 hover:text-primary"
            >
              <FaHome />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="font-bold leading-tight">{user.name}</p>
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${roleBadgeClass[role]}`}
              >
                {role}
              </span>
            </div>
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
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}