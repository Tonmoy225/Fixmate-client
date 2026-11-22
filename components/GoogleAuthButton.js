"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

// শুধু নিজের site-এর path হলে redirect করব (অন্য site-এ নেওয়া যাবে না)
function safePath(path, fallback) {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return fallback;
}

export default function GoogleAuthButton({
  flow = "signin",
  redirect,
  label = "Continue with Google",
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    // callback page-এ গিয়ে flow আর new/existing জানিয়ে toast দেখানো হবে
    const params = new URLSearchParams({ flow });
    const target = safePath(redirect, "");
    if (target) params.set("redirect", target);

    const base = `/auth/complete?${params.toString()}`;

    const { error } = await authClient.signIn.social({
      provider: "google",
      // পুরনো account হলে এখানে ফিরবে
      callbackURL: `${base}&new=0`,
      // একদম নতুন account তৈরি হলে এখানে ফিরবে
      newUserCallbackURL: `${base}&new=1`,
      errorCallbackURL: `${base}&failed=1`,
    });

    // সফল হলে browser নিজেই Google-এ redirect হয়
    if (error) {
      setLoading(false);
      toast.error(error.message || "Google sign-in failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn btn-outline w-full gap-2"
    >
      <FaGoogle className="text-lg" />
      {loading ? "Redirecting..." : label}
    </button>
  );
}
