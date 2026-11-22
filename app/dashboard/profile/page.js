"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, uploadImage } from "@/lib/api";

const roleBadgeClass = {
  customer: "bg-blue-100 text-blue-700",
  technician: "bg-orange-100 text-orange-700",
  admin: "bg-purple-100 text-purple-700",
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({ name: "", phone: "", area: "", bio: "" });
  const [loaded, setLoaded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // user আসার পর form-এ বর্তমান তথ্য বসানো (একবারই)
  useEffect(() => {
    if (user && !loaded) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        area: user.area || "",
        bio: user.bio || "",
      });
      setLoaded(true);
    }
  }, [user, loaded]);

  if (isPending || !user) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const role = user.role || "customer";
  const currentImage = preview || user.image;

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

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (form.phone.trim() && !/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (form.bio.length > 300) {
      newErrors.bio = "Bio must be 300 characters or less";
    }

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
      // নতুন ছবি বাছলে আগে ImgBB-তে, না বাছলে পুরনো ছবিই থাকবে
      const image = imageFile ? await uploadImage(imageFile) : undefined;

      await apiFetch("/api/users/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...form, image }),
      });

      // session নতুন করে আনা, তাই navbar আর dashboard top bar সাথে সাথে বদলায়
      await refetch();
      router.refresh();

      setImageFile(null);
      setPreview("");
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const errorText = (name) =>
    errors[name] && <p className="mt-1 text-sm text-error">{errors[name]}</p>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Update Profile</h1>
      <p className="mb-6 text-slate-500">Keep your information up to date</p>

      <div className="grid max-w-4xl gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="h-fit rounded-2xl bg-white p-6 text-center shadow-md">
          {currentImage ? (
            <img
              src={currentImage}
              alt="profile"
              className="mx-auto h-28 w-28 rounded-full border-4 border-primary object-cover"
            />
          ) : (
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="mt-4 text-xl font-bold">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
          <span
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleBadgeClass[role]}`}
          >
            {role}
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-2xl bg-white p-6 shadow-md lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Role</label>
              <input
                type="text"
                value={role}
                readOnly
                className="input input-bordered w-full bg-base-200 capitalize"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errorText("name")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
              />
              {errorText("phone")}
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Area</label>
              <input
                type="text"
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="e.g. Mirpur, Dhaka"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Bio ({form.bio.length}/300)
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us a little about yourself, your skills and experience"
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errorText("bio")}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="file-input file-input-bordered w-full"
            />
            {errorText("image")}
          </div>

          <button type="submit" disabled={loading} className="btn btn-fixmate">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}