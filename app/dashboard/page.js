import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function DashboardHome() {
  const session = await getSession();
  redirect(`/dashboard/${session?.user?.role || "customer"}`);
}