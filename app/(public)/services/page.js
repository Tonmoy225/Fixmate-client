import { Suspense } from "react";
import ServicesFilter from "@/components/ServicesFilter";
import ServicesList from "@/components/ServicesList";

export const metadata = {
  title: "Browse Services | FixMate",
};

export default function ServicesPage({ searchParams }) {
  return (
    <div className="container-page py-16">
      <h1 className="section-title">Browse Repair Services</h1>
      <p className="section-subtitle">
        Find the right technician for your device or appliance
      </p>

      <Suspense>
        <ServicesFilter />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-96 animate-pulse rounded-2xl bg-slate-200"></div>
            ))}
          </div>
        }
      >
        <ServicesList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}