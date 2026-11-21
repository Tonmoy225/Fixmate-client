import { Suspense } from "react";
import DashboardGate from "@/components/DashboardGate";
import Spinner from "@/components/Spinner";

export default function DashboardLayout({ children }) {
  return (
    <Suspense fallback={<Spinner />}>
      <DashboardGate>{children}</DashboardGate>
    </Suspense>
  );
}