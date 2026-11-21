import { Suspense } from "react";
import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import ServicesSkeleton from "@/components/ServicesSkeleton";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ServicesSkeleton />}>
        <FeaturedServices />
      </Suspense>
    </>
  );
}