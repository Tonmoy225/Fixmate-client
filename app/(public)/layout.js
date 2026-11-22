import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import NavbarFallback from "@/components/NavbarFallback";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}