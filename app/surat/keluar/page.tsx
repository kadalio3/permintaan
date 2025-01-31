import { getSuratKeluar } from "@/lib/surat";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SuratKeluarPage from "@/components/surat/keluar/suratkeluarpg"

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  const suratKeluar = await getSuratKeluar();

  return <SuratKeluarPage suratKeluar={suratKeluar} />;
}
