import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Users() {

  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Harsha",
      email: "harsha@test.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@test.com",
      status: "Suspended",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        className="border p-2 rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200">

          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr
              key={user.id}
              className="border-b"
            >

              <td className="p-3">{user.name}</td>

              <td className="p-3">{user.email}</td>

              <td className="p-3">{user.status}</td>

              <td className="p-3 space-x-2">

                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Approve
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Suspend
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="mt-4 flex justify-between">

        <button className="bg-gray-300 px-4 py-2 rounded">
          Previous
        </button>

        <button className="bg-gray-300 px-4 py-2 rounded">
          Next
        </button>

      </div>

    </DashboardLayout>
  );
}

export default Users;