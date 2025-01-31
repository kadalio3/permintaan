import AddUserForm from "@/components/user/add-user-form";
import { FiUser } from "react-icons/fi";


export default function AddUserPage() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FiUser className="h-6 w-6 text-orange-500" />
          <h1 className="text-xl font-semibold">Add User</h1>
        </div>

        <div className="max-w-xl bg-white rounded-lg shadow-sm p-6">
          <AddUserForm />
        </div>
      </div>
    </div>
  );
} 