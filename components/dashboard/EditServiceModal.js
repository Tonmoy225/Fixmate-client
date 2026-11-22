"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, uploadImage } from "@/lib/api";
import { categories, serviceModes } from "@/lib/constants";

export default function EditServiceModal({ service, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: service.title,
    category: service.category,
    description: service.description,
    basePrice: service.basePrice,
    estimatedDuration: service.estimatedDuration,
    serviceMode: service.serviceMode,
    serviceArea: service.serviceArea,
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(service.image);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = {};

    if (!String(form.title).trim()) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Select a category";
    if (!String(form.description).trim()) newErrors.description = "Description is required";

    if (!(Number(form.basePrice) > 0)) {
      newErrors.basePrice = "Base price must be a positive number";
    }
    if (!String(form.estimatedDuration).trim()) {
      newErrors.estimatedDuration = "Estimated duration is required";
    }
    if (!form.serviceMode) newErrors.serviceMode = "Select a service mode";
    if (!String(form.serviceArea).trim()) newErrors.serviceArea = "Service area is required";

    // নতুন ছবি বাছলে তবেই যাচাই, না বাছলে পুরনো ছবি থাকবে
    if (imageFile) {
      if (!imageFile.type.startsWith("image/")) {
        newErrors.image = "Only image files are allowed";
      } else if (imageFile.size > 5 * 1024 * 1024) {
        newErrors.image = "Image must be smaller than 5 MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const image = imageFile ? await uploadImage(imageFile) : service.image;

      await apiFetch(`/api/services/${service._id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...form, image }),
      });

      toast.success("Service updated. It is waiting for admin approval again.");
      onSaved();
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const errorText = (name) =>
    errors[name] && <p className="mt-1 text-sm text-error">{errors[name]}</p>;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-h-[90vh] max-w-2xl overflow-y-auto">
        <h3 className="text-2xl font-extrabold">Edit Service</h3>
        <p className="mb-4 mt-1 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          After saving, this service will go back to pending and the admin must
          approve it again.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errorText("title")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errorText("category")}
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">Service Mode</label>
              <select
                name="serviceMode"
                value={form.serviceMode}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                {serviceModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
              {errorText("serviceMode")}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errorText("description")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Base Price (USD)</label>
              <input
                type="number"
                name="basePrice"
                min="1"
                value={form.basePrice}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errorText("basePrice")}
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold">Estimated Duration</label>
              <input
                type="text"
                name="estimatedDuration"
                value={form.estimatedDuration}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errorText("estimatedDuration")}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Service Area</label>
            <input
              type="text"
              name="serviceArea"
              value={form.serviceArea}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errorText("serviceArea")}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Service Image (leave empty to keep the current image)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="file-input file-input-bordered w-full"
            />
            {errorText("image")}
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 w-64 rounded-xl object-cover"
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-fixmate" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}