"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import PageLoader from "./PageLoader";

export default function RoleGuard({ role, children }) {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const userRole = user?.role || "customer";

  useEffect(() => {
    if (isPending) return;

    if (!user) {
      router.replace("/sign-in");
    } else if (userRole !== role) {
      router.replace(`/dashboard/${userRole}`);
    }
  }, [isPending, user, userRole, role, router]);

  if (isPending || !user || userRole !== role) {
    return <PageLoader />;
  }

  return children;
}
