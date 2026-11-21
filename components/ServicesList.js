import Link from "next/link";
import ServiceCard from "./ServiceCard";

async function getServices(params) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.serviceMode) query.set("serviceMode", params.serviceMode);
  if (params.sort) query.set("sort", params.sort);
  query.set("page", params.page || "1");
  query.set("limit", "12");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services?${query.toString()}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed");
    return await res.json();
  } catch (error) {
    return { services: [], total: 0, page: 1, totalPages: 0 };
  }
}

export default async function ServicesList({ searchParams }) {
  const params = await searchParams;
  const { services, total, page, totalPages } = await getServices(params);

  // pagination লিংকে বাকি filter গুলো ধরে রাখা
  const pageHref = (pageNumber) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.category) query.set("category", params.category);
    if (params.serviceMode) query.set("serviceMode", params.serviceMode);
    if (params.sort) query.set("sort", params.sort);
    query.set("page", pageNumber);
    return `/services?${query.toString()}`;
  };

  // Empty state
  if (services.length === 0) {
    return (
      <div className="rounded-2xl bg-white py-16 text-center shadow-md">
        <p className="text-2xl font-bold">No services found</p>
        <p className="mt-2 text-slate-500">
          Try a different search or clear the filters.
        </p>
        <Link href="/services" className="btn btn-fixmate mt-6">
          Clear Filters
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-5 text-slate-500">
        Showing <span className="font-bold text-slate-800">{services.length}</span>{" "}
        of <span className="font-bold text-slate-800">{total}</span> services
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {page > 1 && (
            <Link href={pageHref(page - 1)} className="btn btn-outline btn-sm">
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={pageHref(pageNumber)}
                className={
                  pageNumber === page
                    ? "btn btn-fixmate btn-sm"
                    : "btn btn-outline btn-sm"
                }
              >
                {pageNumber}
              </Link>
            )
          )}

          {page < totalPages && (
            <Link href={pageHref(page + 1)} className="btn btn-outline btn-sm">
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}