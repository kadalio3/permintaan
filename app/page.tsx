import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FiGrid } from "react-icons/fi";
import CustomLayout from "@/components/layout/layout";
export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <CustomLayout>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiGrid className="h-6 w-6 text-orange-500" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card Statistik */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total Surat</h3>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Surat Hari Ini</h3>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Surat Bulan Ini</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}
