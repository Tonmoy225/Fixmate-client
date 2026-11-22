"use client";

import { useSyncExternalStore } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

// <html data-theme="..."> এর পরিবর্তন শোনা
function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.getAttribute("data-theme");
const getServerSnapshot = () => "fixmate";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "fixmate-dark";

  const handleToggle = () => {
    const next = isDark ? "fixmate" : "fixmate-dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("fixmate-theme", next);
    } catch (error) {}
  };

  return (
    <button
      onClick={handleToggle}
      title={isDark ? "Switch to day mode" : "Switch to night mode"}
      className="relative flex h-8 w-16 shrink-0 items-center rounded-full px-1 shadow-inner transition-all duration-300"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #312e81, #6d28d9)"
          : "linear-gradient(135deg, #fbbf24, #f97316)",
      }}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm shadow transition-transform duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <FaMoon className="text-indigo-600" />
        ) : (
          <FaSun className="text-orange-500" />
        )}
      </span>
    </button>
  );
}