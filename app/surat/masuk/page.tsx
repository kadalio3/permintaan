import { getSuratMasuk } from "@/lib/surat";
import SuratMasukPage from "@/components/surat/masuk/table-masuk";

export default async function Page() {
  const suratMasuk = await getSuratMasuk();
  return <SuratMasukPage suratMasuk={suratMasuk} />;
}
