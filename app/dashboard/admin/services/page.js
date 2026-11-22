"use client";

import PageLoader from "@/components/PageLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApprovalBadge } from "@/components/dashboard/StatusBadge";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import { apiFetch } from "@/lib/api";

const filters = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function ServiceApprovalPage() {
  const [services, setServices] = useState(null);
  const [filter, setFilter] = useState("");
  const [rejectService, setRejectService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reload, setReload] = useState(0);

  // filter server-এ হয়, pending service সবার আগে আসে
  useEffect(() => {
    const query = filter ? `?approvalStatus=${filter}` : "";
    apiFetch(`/api/admin/services${query}`)
      .then(setServices)
      .catch((error) => {
        toast.error(error.message);
        setServices([]);
      });
  }, [filter, reload]);

  const updateApproval = async (service, approvalStatus) => {
    setSaving(true);
    try {
      await apiFetch(`/api/admin/services/${service._id}/approval`, {
        method: "PATCH",
        body: JSON.stringify({ approvalStatus }),
      });
      toast.success(`Service ${approvalStatus}`);
      setRejectService(null);
      setReload((value) => value + 1);
    } catch (error) {
      toast.error(error.message);
    }
    setSaving(false);
  };

  const Actions = ({ service }) => (
    <div className="flex gap-2">
      {service.approvalStatus !== "approved" && (
        <button
          onClick={() => updateApproval(service, "approved")}
          disabled={saving}
          className="btn btn-success btn-sm text-white"
        >
          Approve
        </button>
      )}
      {service.approvalStatus !== "rejected" && (
        <button
          onClick={() => setRejectService(service)}
          className="btn btn-outline btn-error btn-sm"
        >
          Reject
        </button>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Service Approval</h1>
      <p className="mb-6 text-slate-500">
        Review services added by technicians. Pending services are shown first.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setServices(null);
              setFilter(item.value);
            }}
            className={
              filter === item.value
                ? "btn btn-fixmate btn-sm"
                : "btn btn-outline btn-sm"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      {!services ? (
        <PageLoader />
      ) : services.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No services found</p>
          <p className="mt-2 text-slate-500">
            There are no services with this status.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md lg:block">
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Technician</th>
                  <th>Price</th>
                  <th>Approval</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <span className="font-semibold">{service.title}</span>
                      </div>
                    </td>
                    <td>{service.category}</td>
                    <td>
                      <p>{service.technicianName}</p>
                      <p className="text-sm text-slate-500">{service.technicianEmail}</p>
                    </td>
                    <td>${service.basePrice}</td>
                    <td>
                      <ApprovalBadge approvalStatus={service.approvalStatus} />
                    </td>
                    <td>
                      <Actions service={service} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile + tablet cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {services.map((service) => (
              <div key={service._id} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold">{service.title}</p>
                    <p className="text-sm text-slate-500">
                      {service.category} · ${service.basePrice}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  By {service.technicianName}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <ApprovalBadge approvalStatus={service.approvalStatus} />
                  <Actions service={service} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {rejectService && (
        <ConfirmModal
          title="Reject this service?"
          message={`"${rejectService.title}" will be rejected and will not appear on the website.`}
          confirmText="Yes, Reject"
          loading={saving}
          onConfirm={() => updateApproval(rejectService, "rejected")}
          onCancel={() => setRejectService(null)}
        />
      )}
    </div>
  );
}