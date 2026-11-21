import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function RedirectIfLoggedIn({ children }) {
  const session = await getSession();

  if (session) {
    redirect(`/dashboard/${session.user.role || "customer"}`);
  }

  return children;
}