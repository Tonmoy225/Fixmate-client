import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "FixMate | Device & Home Appliance Repair",
  description:
    "Book verified technicians to repair your smartphone, laptop, AC, TV and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="fixmate">
      <body className={jakarta.variable}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}