import Link from "next/link";
import { FaMapMarkerAlt, FaUserCog } from "react-icons/fa";

export default function ServiceCard({ service }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      {/* সব ছবির সাইজ এক */}
      <img
        src={service.image}
        alt={service.title}
        className="h-48 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            {service.category}
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {service.serviceMode}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold">
          {service.title}
        </h3>

        <div className="mt-2 space-y-1 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <FaUserCog className="text-primary" />
            {service.technicianName}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            {service.serviceArea}
          </p>
        </div>

        {/* বাটন সবসময় card-এর নিচে থাকবে */}
        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-xl font-extrabold text-primary">
              ${service.basePrice}
            </p>
          </div>
          <Link href={`/services/${service._id}`} className="btn btn-fixmate btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}