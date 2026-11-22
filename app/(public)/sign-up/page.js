"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUser, FaWrench } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Password must have at least one uppercase letter";
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = "Password must have at least one lowercase letter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Sign up failed");
      return;
    }

    toast.success("Account created successfully!");
    router.push(`/dashboard/${form.role}`);
  };

  const roleCardClass = (role) =>
    form.role === role
      ? "flex-1 cursor-pointer rounded-xl border-2 border-primary bg-orange-50 p-4 text-center"
      : "flex-1 cursor-pointer rounded-xl border-2 border-base-300 bg-white p-4 text-center hover:border-primary";

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-extrabold">Create Account</h1>
        <p className="mb-6 mt-1 text-center text-slate-500">
          Join FixMate as a customer or a technician
        </p>

        <GoogleAuthButton flow="signup" label="Sign up with Google" />

        <p className="mt-2 text-center text-xs text-slate-500">
          New Google accounts start as customers.
        </p>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-base-300" />
          <span className="text-xs font-semibold uppercase text-slate-400">or</span>
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Role selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold">I am a</label>
            <div className="flex gap-3">
              <div
                className={roleCardClass("customer")}
                onClick={() => setForm({ ...form, role: "customer" })}
              >
                <FaUser className="mx-auto mb-2 text-2xl text-primary" />
                <p className="font-semibold">Customer</p>
                <p className="text-xs text-slate-500">I need a repair</p>
              </div>
              <div
                className={roleCardClass("technician")}
                onClick={() => setForm({ ...form, role: "technician" })}
              >
                <FaWrench className="mx-auto mb-2 text-2xl text-primary" />
                <p className="font-semibold">Technician</p>
                <p className="text-xs text-slate-500">I offer repairs</p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 chars, upper + lower case"
                className="input input-bordered w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition-colors hover:text-primary"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn btn-fixmate w-full">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}