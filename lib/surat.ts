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

export const getStatusSurat = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.role) {
    redirect("/");
  }

  try {
    const statusSurat = await prisma.statusSurat.findMany();
    return statusSurat;
  } catch (error) {
    console.error("Error fetching status surat", error);
    return [];
  }
};

export const getSuratMasukFiltered = async (filters?: {
  statusId?: string;
  searchQuery?: string;
  // Tambahkan filter lain jika diperlukan
}) => {
  const session = await auth();
  if (!session?.user?.role) {
    redirect("/");
  }

  try {
    const suratMasuk = await prisma.suratMasuk.findMany({
      where: {
        statusId: filters?.statusId,
        OR: filters?.searchQuery ? [
          { noSurat: { contains: filters.searchQuery } },
          { asalSurat: { contains: filters.searchQuery } },
          { prihal: { contains: filters.searchQuery } }
        ] : undefined
      },
      orderBy: {
        tanggalTerimaSurat: "desc"
      },
      include: {
        status: true
      }
    });
    return suratMasuk;
  } catch (error) {
    console.error("Error fetching filtered surat masuk:", error);
    return [];
  }
};