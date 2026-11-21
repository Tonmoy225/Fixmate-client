import Link from "next/link";
import { FaTools, FaHome } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container-page flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
        {/* 404 লেখার মাঝের 0 এর জায়গায় tools আইকন */}
        <div className="flex items-center gap-2 text-8xl font-extrabold text-secondary md:text-9xl">
          <span>4</span>
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-5xl text-white md:h-32 md:w-32 md:text-6xl">
            <FaTools />
          </span>
          <span>4</span>
        </div>

        <h1 className="mt-8 text-3xl font-extrabold">Page Not Found</h1>
        <p className="mt-3 max-w-md text-slate-500">
          Looks like this page needs repair. The page you are looking for does
          not exist or has been moved.
        </p>

        <Link href="/" className="btn btn-fixmate mt-8">
          <FaHome />
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}