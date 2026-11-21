import { Suspense } from "react";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";

export default function SignInLayout({ children }) {
  return (
    <Suspense>
      <RedirectIfLoggedIn>{children}</RedirectIfLoggedIn>
    </Suspense>
  );
}