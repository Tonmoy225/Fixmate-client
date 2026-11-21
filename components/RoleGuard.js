import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function RoleGuard({ role, children }) {
  const session = await getSession();
  const userRole = session?.user?.role || "customer";

  if (userRole !== role) {
    redirect(`/dashboard/${userRole}`);
  }

  return children;
}