"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApprovalBadge } from "@/components/dashboard/StatusBadge";
import ConfirmModal from "@/components/dashboard/ConfirmModal";
import EditServiceModal from "@/components/dashboard/EditServiceModal";
import { apiFetch } from "@/lib/api";

export default function MyServicesPage() {
  const [services, setServices] = useState(null);
  const [editService, setEditService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadServices = () => {
    apiFetch("/api/services/mine")
      .then(setServices)
      .catch((error) => {
        toast.error(error.message);
        setServices([]);
      });
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleToggle = async (service) => {
    const newValue = !service.isAvailable;
    try {
      await apiFetch(`/api/services/${service._id}/availability`, {
        method: "PATCH",
        body: JSON.stringify({ isAvailable: newValue }),
      });
      toast.success(newValue ? "Service is now available" : "Service is now hidden");
      loadServices();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch(`/api/services/${deleteId}`, { method: "DELETE" });
      toast.success("Service deleted");
      setDeleteId(null);
      loadServices();
    } catch (error) {
      toast.error(error.message);
    }
    setDeleting(false);
  };

  // table আর mobile card দুই জায়গায় একই বাটন
  const Actions = ({ service }) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setEditService(service)}
        className="btn btn-outline btn-sm"
      >
        Edit
      </button>
      <button
        onClick={() => setDeleteId(service._id)}
        className="btn btn-outline btn-error btn-sm"
      >
        Delete
      </button>
    </div>
  );

  const Availability = ({ service }) => (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        className="toggle toggle-success toggle-sm"
        checked={service.isAvailable}
        onChange={() => handleToggle(service)}
      />
      <span className="text-sm">{service.isAvailable ? "On" : "Off"}</span>
    </label>
  );

  if (!services) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">My Services</h1>
          <p className="text-slate-500">Edit, hide or delete your repair services</p>
        </div>
        <Link href="/dashboard/technician/add-service" className="btn btn-fixmate">
          Add Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No services yet</p>
          <p className="mt-2 text-slate-500">
            Add your first repair service to start getting requests.
          </p>
          <Link href="/dashboard/technician/add-service" className="btn btn-fixmate mt-6">
            Add Service
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md md:block">
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Approval</th>
                  <th>Available</th>
                  <th>Actions</th>
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
                    <td>${service.basePrice}</td>
                    <td>
                      <ApprovalBadge approvalStatus={service.approvalStatus} />
                    </td>
                    <td>
                      <Availability service={service} />
                    </td>
                    <td>
                      <Actions service={service} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 md:hidden">
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

                <div className="mt-3 flex items-center justify-between">
                  <ApprovalBadge approvalStatus={service.approvalStatus} />
                  <Availability service={service} />
                </div>

                <div className="mt-3">
                  <Actions service={service} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editService && (
        <EditServiceModal
          service={editService}
          onClose={() => setEditService(null)}
          onSaved={() => {
            setEditService(null);
            loadServices();
          }}
        />
      )}

      {deleteId && (
        <ConfirmModal
          title="Delete this service?"
          message="This service will be removed permanently. This cannot be undone."
          confirmText="Yes, Delete"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}