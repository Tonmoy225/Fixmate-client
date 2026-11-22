"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import PageLoader from "@/components/PageLoader";

// একই URL-এ বারবার effect চললেও যেন toast একবারই আসে
const handled = new Set();

function safePath(path, fallback) {
  if (path && path.startsWith("/") && !path.startsWith("//")) return path;
  return fallback;
}

function AuthComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = searchParams.toString();
    if (handled.has(key)) return;
    handled.add(key);

    const flow = searchParams.get("flow") || "signin";
    const isNew = searchParams.get("new") === "1";
    const failed = searchParams.get("failed") === "1";
    const errorCode = searchParams.get("error");
    const redirect = searchParams.get("redirect");

    (async () => {
      const { data } = await authClient.getSession();
      const role = data?.user?.role || "customer";

      if (failed) {
        toast.error(
          errorCode === "account_not_linked"
            ? "This email is already in use. Please sign in with your password."
            : "Google login failed. Please try again."
        );
        router.replace("/sign-in");
        return;
      }

      if (flow === "signup" && !isNew) {
        // Google account আগে থেকেই এই site-এ আছে
        toast.error("This email is already in use.");
      } else if (flow === "signup" && isNew) {
        toast.success("Account created and logged in successfully!");
      } else {
        toast.success("Logged in successfully!");
      }

      router.replace(safePath(redirect, `/dashboard/${role}`));
      router.refresh();
    })();
  }, [router, searchParams]);

  return <PageLoader />;
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthComplete />
    </Suspense>
  );
}
