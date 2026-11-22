import { Suspense } from "react";
import RoleGuard from "@/components/RoleGuard";
import Spinner from "@/components/Spinner";

export default function PaymentLayout({ children }) {
  return (
    <Suspense fallback={<Spinner />}>
      <RoleGuard role="customer">{children}</RoleGuard>
    </Suspense>
  );
}