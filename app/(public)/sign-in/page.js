"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleAuthButton from "@/components/GoogleAuthButton";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setLoading(false);
      toast.error("Invalid email or password");
      return;
    }

    // login-এর পর user-এর role জানতে session নিচ্ছি
    const { data } = await authClient.getSession();
    const role = data?.user?.role || "customer";

    setLoading(false);
    toast.success("Signed in successfully!");

    // যে page-এ যেতে চেয়েছিল সেখানে, না থাকলে নিজের dashboard-এ
    // "/" দিয়ে শুরু হলে এবং "//" না হলে তবেই redirect করব (অন্য site-এ যাওয়া আটকাতে)
    const isSafe = redirect && redirect.startsWith("/") && !redirect.startsWith("//");
    router.push(isSafe ? redirect : `/dashboard/${role}`);
    router.refresh();
  };

  return (
    <div className="container-page flex justify-center py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-extrabold">Welcome Back</h1>
        <p className="mb-6 mt-1 text-center text-slate-500">
          Sign in to manage your repair jobs
        </p>

        <GoogleAuthButton flow="signin" redirect={redirect} />

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-base-300" />
          <span className="text-xs font-semibold uppercase text-slate-400">or</span>
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error">{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn btn-fixmate w-full">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

// useSearchParams ব্যবহার করলে Suspense দিয়ে মুড়তে হয়, না হলে build-এ error আসে
export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}