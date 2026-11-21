import RoleGuard from "@/components/RoleGuard";

export default function TechnicianLayout({ children }) {
  return <RoleGuard role="technician">{children}</RoleGuard>;
}