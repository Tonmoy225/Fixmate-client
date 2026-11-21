import { Suspense } from "react";
import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import ServicesSkeleton from "@/components/ServicesSkeleton";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ServicesSkeleton />}>
        <FeaturedServices />
      </Suspense>
      <HowItWorks />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}