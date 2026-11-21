import Link from "next/link";
import ServiceCard from "./ServiceCard";

async function getLatestServices() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services?limit=6&sort=newest`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.services;
  } catch (error) {
    return [];
  }
}

export default async function FeaturedServices() {
  const services = await getLatestServices();

  return (
    <section className="container-page py-20">
      <h2 className="section-title">Featured Services</h2>
      <p className="section-subtitle">
        Latest repair services from our verified technicians
      </p>

      {services.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-xl font-bold">No services available yet</p>
          <p className="mt-2 text-slate-500">Please check back soon.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services" className="btn btn-fixmate">
              View All Services
            </Link>
          </div>
        </>
      )}
    </section>
  );
}