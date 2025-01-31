import { FiUsers, FiEdit2, FiPlus } from "react-icons/fi";
import { getUsers } from "@/lib/users";
import Link from "next/link";
import DeleteUserButton from "@/components/user/delete-user-button";

export default async function UserPage() {  
  const users = await getUsers();

  return (
     <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiUsers className="h-6 w-6 text-orange-500" />
              <h1 className="text-xl font-semibold">Daftar User</h1>
            </div>
            
            <Link 
              href="/user/add" 
              className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <FiPlus className="h-4 w-4" />
              Add User
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="px-6 py-3">Username</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users?.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <DeleteUserButton userId={user.id} username={""} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     </div>
  );
}