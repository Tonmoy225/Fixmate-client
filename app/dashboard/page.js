"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import PageLoader from "@/components/PageLoader";

export default function DashboardHome() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const role = data?.user?.role || "customer";
    router.replace(data?.user ? `/dashboard/${role}` : "/sign-in");
  }, [data, isPending, router]);

  return <PageLoader />;
}
