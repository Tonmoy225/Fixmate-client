"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href) =>
    isActive(href)
      ? "font-semibold text-primary"
      : "font-medium text-slate-200 hover:text-primary";

  return (
    <header className="sticky top-0 z-50 bg-secondary shadow-md">
      <div className="container-page flex items-center justify-between py-3">
        <Logo />

        {/* Desktop menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* লগইন থাকলে avatar, না থাকলে বাটন (desktop) */}
          {!isPending && user && <UserMenu user={user} />}

          {!isPending && !user && (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/sign-in"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary"
              >
                Sign In
              </Link>
              <Link href="/sign-up" className="btn btn-fixmate">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="text-3xl text-white md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-700 bg-secondary md:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!isPending && !user && (
              <div className="flex gap-3">
                <Link
                  href="/sign-in"
                  className="btn btn-outline flex-1 border-white text-white hover:bg-white hover:text-secondary"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="btn btn-fixmate flex-1"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}