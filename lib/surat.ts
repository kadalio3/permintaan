"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getSuratMasuk = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.role) {
    redirect("/");
  }

  try {
    const suratMasuk = await prisma.suratMasuk.findMany({
      orderBy: {
        tanggalTerimaSurat: "desc",
      },
      include: {
        status: true, // Include the related StatusSurat data
      },
    });
    return suratMasuk;
  } catch (error) {
    console.error("Error fetching surat masuk:", error);
    return [];
  }
};

export const getSuratKeluar = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.role) {
    redirect("/");
  }

  try {
    const suratKeluar = await prisma.suratKeluar.findMany({
      orderBy: {
        tanggalSurat: "desc",
      },
    });
    return suratKeluar;
  } catch (error) {
    console.error("Error fetching surat keluar:", error);
    return [];
  }
};
