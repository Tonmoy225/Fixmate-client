import Logo from "./Logo";

// আসল Navbar লোড হওয়ার আগে একই উচ্চতার header দেখায়
export default function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 bg-secondary shadow-md">
      <div className="container-page flex items-center justify-between py-3">
        <Logo />
      </div>
    </header>
  );
}