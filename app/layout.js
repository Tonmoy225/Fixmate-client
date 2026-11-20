import "./globals.css";

export const metadata = {
  title: "FixMate | Device & Home Appliance Repair",
  description:
    "Book verified technicians to repair your smartphone, laptop, AC, TV and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}