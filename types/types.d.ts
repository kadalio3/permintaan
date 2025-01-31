interface SuratKeluar {
  id: string;
  noSurat: string;
  prihalSurat: string;
  tanggalSurat: Date;
  dibuat: Date;
}

interface initialSuratKeluar {
  id: string;
  noSurat: string;
  prihalSurat: string;
  tanggalSurat: Date;
  dibuat: Date;
}

interface SuratMasuk {
  id: string;
  noSurat: string;
  asalSurat: string;
  prihal: string;
  tanggalSurat: Date;
  tanggalTerimaSurat: Date;
  status: {
    id: string;
    namaStatus: string;
  };
  statusId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StatusSurat {
  id: string;
  namaStatus: string;
}