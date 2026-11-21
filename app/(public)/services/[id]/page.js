import { notFound } from "next/navigation";
import { FaClock, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import RequestRepair from "@/components/RequestRepair";

async function getService(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load service");

  return res.json();
}

export default async function ServiceDetailsPage({ params }) {
  const { id } = await params;
  const service = await getService(id);

  // service না থাকলে বা approved/available না হলে Not Found page
  if (!service) notFound();

  const technician = service.technician;
  const technicianName = technician?.name || service.technicianName;

  return (
    <div className="container-page py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: image + description */}
        <div className="lg:col-span-2">
          <img
            src={service.image}
            alt={service.title}
            className="h-72 w-full rounded-2xl object-cover shadow-md md:h-96"
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
              {service.category}
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              {service.serviceMode}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
            {service.title}
          </h1>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold">About This Service</h2>
            <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
          </div>
        </div>

        {/* Right: price + info + request button + technician */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">Starting from</p>
            <p className="text-4xl font-extrabold text-primary">
              ${service.basePrice}
            </p>

            <ul className="my-5 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <FaClock className="text-primary" />
                Estimated time: {service.estimatedDuration}
              </li>
              <li className="flex items-center gap-3">
                <FaHome className="text-primary" />
                Mode: {service.serviceMode}
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                Area: {service.serviceArea}
              </li>
            </ul>

            <RequestRepair serviceId={service._id} />
            <p className="mt-3 text-center text-xs text-slate-500">
              You pay only after the job is completed
            </p>
          </div>

          {/* Technician summary */}
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Your Technician</h2>
            <div className="flex items-center gap-4">
              {technician?.image ? (
                <img
                  src={technician.image}
                  alt={technicianName}
                  className="h-16 w-16 rounded-full border-2 border-primary object-cover"
                />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  {technicianName?.charAt(0).toUpperCase()}
                </span>
              )}
              <div>
                <p className="font-bold">{technicianName}</p>
                <p className="text-sm text-slate-500">
                  {technician?.area || service.serviceArea}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {technician?.bio || "Verified FixMate technician."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}