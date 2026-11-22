import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden bg-secondary">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so the text is easy to read */}
            <div className="hero-overlay absolute inset-0"></div>

      {/* Content */}
      <div className="container-page relative py-20 text-center">
        <span className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
          Trusted Repair Platform in Bangladesh
        </span>

        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
          Broken Device? Get It Fixed by{" "}
          <span className="text-primary">Verified Technicians</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          Book repair for your phone, laptop, AC, TV and more. Track every step
          of the job and pay only after the work is done.
        </p>

        {/* Search box: submits to /services?search=... */}
        <form
          action="/services"
          method="get"
          className="mx-auto mt-8 flex max-w-xl overflow-hidden rounded-xl bg-white p-1.5 shadow-xl"
        >
          <input
            type="text"
            name="search"
            placeholder="Search e.g. iPhone screen, AC servicing..."
            className="w-full px-4 text-slate-800 outline-none"
          />
          <button type="submit" className="btn btn-fixmate">
            <FaSearch />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/services" className="btn btn-fixmate">
            Browse Services
          </Link>
          <Link
            href="/sign-up"
            className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary"
          >
            Become a Technician
          </Link>
        </div>

        {/* Trust stats */}
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 text-white">
          <div>
            <p className="text-3xl font-extrabold text-primary">500+</p>
            <p className="text-sm text-slate-300">Verified Technicians</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">10k+</p>
            <p className="text-sm text-slate-300">Jobs Completed</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">100%</p>
            <p className="text-sm text-slate-300">Pay After Service</p>
          </div>
        </div>
      </div>
    </section>
  );
}