import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";
import Logo from "./Logo";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/about" },
];

const categories = [
  "Smartphone",
  "Laptop & PC",
  "AC",
  "Refrigerator",
  "TV",
  "Washing Machine",
  "Electrical",
];

const socials = [
  { name: "X", href: "https://x.com", icon: <FaXTwitter /> },
  { name: "Facebook", href: "https://facebook.com", icon: <FaFacebookF /> },
  { name: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedinIn /> },
  { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-slate-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-6">
            Book verified technicians for your phone, laptop and home appliances.
            Track every job and pay only after the work is done.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-primary"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular categories */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/services?category=${encodeURIComponent(category)}`}
                  className="hover:text-primary"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              support@fixmate.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-primary" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-3">
              <FaLocationDot className="text-primary" />
              Dhanmondi, Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

            <div className="border-t border-slate-700 py-5 text-center text-sm">
        © 2026 FixMate. All rights reserved.
      </div>
    </footer>
  );
}