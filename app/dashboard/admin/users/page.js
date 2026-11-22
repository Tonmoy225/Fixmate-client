"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const roleBadgeClass = {
  customer: "bg-blue-100 text-blue-700",
  technician: "bg-orange-100 text-orange-700",
  admin: "bg-purple-100 text-purple-700",
};

export default function ManageUsersPage() {
  const { data: session } = authClient.useSession();
  const myEmail = session?.user?.email;

  const [users, setUsers] = useState(null);

  const loadUsers = () => {
    apiFetch("/api/admin/users")
      .then(setUsers)
      .catch((error) => {
        toast.error(error.message);
        setUsers([]);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (user, role) => {
    try {
      await apiFetch(`/api/admin/users/${user._id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      toast.success(`${user.name} is now a ${role}`);
      loadUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "—";

  const Avatar = ({ user }) =>
    user.image ? (
      <img
        src={user.image}
        alt={user.name}
        className="h-11 w-11 rounded-full object-cover"
      />
    ) : (
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white">
        {user.name?.charAt(0).toUpperCase()}
      </span>
    );

  // নিজের account-এর role বদলানো যাবে না
  const RoleSelect = ({ user }) =>
    user.email === myEmail ? (
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleBadgeClass[user.role]}`}
      >
        {user.role} (you)
      </span>
    ) : (
      <select
        value={user.role || "customer"}
        onChange={(e) => handleRoleChange(user, e.target.value)}
        className="select select-bordered select-sm"
      >
        <option value="customer">Customer</option>
        <option value="technician">Technician</option>
        <option value="admin">Admin</option>
      </select>
    );

  if (!users) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Manage Users</h1>
      <p className="mb-6 text-slate-500">See all users and change their roles</p>

      {users.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-md">
          <p className="text-2xl font-bold">No users found</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-md md:block">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar user={user} />
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td className="whitespace-nowrap">{formatDate(user.createdAt)}</td>
                    <td>
                      <RoleSelect user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 md:hidden">
            {users.map((user) => (
              <div key={user._id} className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <Avatar user={user} />
                  <div className="min-w-0">
                    <p className="font-bold">{user.name}</p>
                    <p className="truncate text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Joined {formatDate(user.createdAt)}
                  </span>
                  <RoleSelect user={user} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}