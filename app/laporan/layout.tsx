import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Sidebar userRole={session?.user?.role} />
      <div className="pl-64">
      <Navbar session={session} />
        <main className="pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}