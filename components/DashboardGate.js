import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import DashboardShell from "./DashboardShell";

export default async function DashboardGate({ children }) {
  const session = await getSession();

  // cookie থাকলেও session সত্যি valid না হলে sign-in এ
  if (!session) redirect("/sign-in");

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || null,
    role: session.user.role || "customer",
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}