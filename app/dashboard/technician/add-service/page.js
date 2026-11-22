"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, uploadImage } from "@/lib/api";
import { categories, serviceModes } from "@/lib/constants";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  basePrice: "",
  estimatedDuration: "",
  serviceMode: "",
  serviceArea: "",
};

export default function AddServicePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [fileKey, setFileKey] = useState(0); // form reset-এ file input খালি করার জন্য
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

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Select a category";
    if (!form.description.trim()) newErrors.description = "Description is required";

    if (!form.basePrice) {
      newErrors.basePrice = "Base price is required";
    } else if (!(Number(form.basePrice) > 0)) {
      newErrors.basePrice = "Base price must be a positive number";
    }

    if (!form.estimatedDuration.trim()) {
      newErrors.estimatedDuration = "Estimated duration is required";
    }
    if (!form.serviceMode) newErrors.serviceMode = "Select a service mode";
    if (!form.serviceArea.trim()) newErrors.serviceArea = "Service area is required";

    if (!imageFile) {
      newErrors.image = "Service image is required";
    } else if (!imageFile.type.startsWith("image/")) {
      newErrors.image = "Only image files are allowed";
    } else if (imageFile.size > 5 * 1024 * 1024) {
      newErrors.image = "Image must be smaller than 5 MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // ১. আগে ছবি ImgBB-তে, ২. তারপর service server-এ
      const imageUrl = await uploadImage(imageFile);

      await apiFetch("/api/services", {
        method: "POST",
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      toast.success("Service submitted! It is waiting for admin approval.");
      setForm(emptyForm);
      setImageFile(null);
      setPreview("");
      setFileKey(fileKey + 1);
      setErrors({});
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const errorText = (name) =>
    errors[name] && <p className="mt-1 text-sm text-error">{errors[name]}</p>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Add a Service</h1>
      <p className="mb-6 text-slate-500">
        Your service will appear on the website after the admin approves it
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-md"
      >
        {/* Technician info (read-only) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">Technician Name</label>
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Technician Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. iPhone Screen Replacement"
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
              <option value="">Select category</option>
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
              <option value="">Select mode</option>
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
            placeholder="What does this service include?"
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
              placeholder="e.g. 45"
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
              placeholder="e.g. 2-3 hours"
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
            placeholder="e.g. Dhanmondi, Dhaka"
            className="input input-bordered w-full"
          />
          {errorText("serviceArea")}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Service Image</label>
          <input
            key={fileKey}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="file-input file-input-bordered w-full"
          />
          {errorText("image")}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 w-64 rounded-xl object-cover"
            />
          )}
        </div>

        <button type="submit" disabled={loading} className="btn btn-fixmate">
          {loading ? "Submitting..." : "Submit Service"}
        </button>
      </form>
    </div>
  );
}