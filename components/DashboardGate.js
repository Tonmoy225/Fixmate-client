"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardShell from "./DashboardShell";
import PageLoader from "./PageLoader";

export default function DashboardGate({ children }) {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  // session না থাকলে sign-in এ
  useEffect(() => {
    if (!isPending && !user) router.replace("/sign-in");
  }, [isPending, user, router]);

  if (isPending || !user) {
    return <PageLoader />;
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
