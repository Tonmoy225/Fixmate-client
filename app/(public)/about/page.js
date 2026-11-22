import Link from "next/link";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";

export const metadata = {
  title: "How It Works | FixMate",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-secondary py-20 text-center">
        <div className="container-page">
          <span className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
            About FixMate
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Repair Made <span className="text-primary">Simple and Trusted</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            FixMate connects people with verified technicians for phone, laptop and
            home appliance repair, with a clear status for every job.
          </p>
        </div>
      </section>

      {/* Problem and solution */}
      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="text-2xl font-extrabold">The Problem</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Finding a trustworthy repair technician is hard. After handing over a
              device, people have no idea what is happening with the job, and they
              often pay before any work is done. Skilled technicians, on the other
              hand, have no proper place to show their services and manage jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <h2 className="text-2xl font-extrabold">Our Solution</h2>
            <p className="mt-3 leading-7 text-slate-600">
              On FixMate every job has a trackable status from requested to
              completed, and payment happens only after the work is delivered.
              Technicians get a structured dashboard, and our admin team approves
              every service before it goes live.
            </p>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Who is it for */}
      <section className="container-page py-20">
        <h2 className="section-title">Built for Everyone</h2>
        <p className="section-subtitle">Three roles, one simple platform</p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-blue-600">Customers</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Browse services, send repair requests, follow the job step by step and
              pay online after the work is completed.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-orange-600">Technicians</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              List your repair services, accept requests, update job status and set
              the final amount when the job is done.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-xl font-bold text-purple-600">Admins</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Approve services, manage users, monitor every booking and track all
              revenue in one place.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Call to action */}
      <section className="container-page py-20 text-center">
        <h2 className="section-title">Ready to Get It Fixed?</h2>
        <p className="section-subtitle">
          Find a verified technician and send your first repair request today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services" className="btn btn-fixmate">
            Browse Services
          </Link>
          <Link href="/sign-up" className="btn btn-outline">
            Create Account
          </Link>
        </div>
      </section>
    </>
  );
}