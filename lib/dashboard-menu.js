import {
  MdDashboard,
  MdEventNote,
  MdPayments,
  MdPerson,
  MdAddBox,
  MdBuild,
  MdAssignment,
  MdPeople,
  MdVerified,
  MdReceiptLong,
} from "react-icons/md";

const profile = {
  name: "Update Profile",
  href: "/dashboard/profile",
  icon: <MdPerson />,
};

export const menuByRole = {
  customer: [
    { name: "Overview", href: "/dashboard/customer", icon: <MdDashboard /> },
    { name: "My Bookings", href: "/dashboard/customer/bookings", icon: <MdEventNote /> },
    { name: "Payment History", href: "/dashboard/customer/payments", icon: <MdPayments /> },
    profile,
  ],
  technician: [
    { name: "Overview", href: "/dashboard/technician", icon: <MdDashboard /> },
    { name: "Add Service", href: "/dashboard/technician/add-service", icon: <MdAddBox /> },
    { name: "My Services", href: "/dashboard/technician/my-services", icon: <MdBuild /> },
    { name: "Manage Requests", href: "/dashboard/technician/requests", icon: <MdAssignment /> },
    profile,
  ],
  admin: [
    { name: "Overview", href: "/dashboard/admin", icon: <MdDashboard /> },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: <MdPeople /> },
    { name: "Service Approval", href: "/dashboard/admin/services", icon: <MdVerified /> },
    { name: "All Bookings", href: "/dashboard/admin/bookings", icon: <MdEventNote /> },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: <MdReceiptLong /> },
    profile,
  ],
};