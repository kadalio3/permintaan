"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function TambahSuratKeluar(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  try {
    // Extract form data
    const noSurat = formData.get("noSurat") as string;
    const prihalSurat = formData.get("prihalSurat") as string;
    const tanggalSurat = new Date(formData.get("tanggalSurat") as string);

    // Create new surat keluar
    await prisma.suratKeluar.create({
      data: {
        noSurat,
        prihalSurat,
        tanggalSurat,
      },
    });

    return {
      success: true,
      message: "Surat Keluar berhasil ditambahkan",
    };
  } catch (error) {
    console.error("Gagal menambahkan Surat:", error);
    return {
      success: false,
      message: "Gagal menambahkan Surat",
    };
  }
}

export const deleteSuratKeluar = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/surat/keluar");
  }
  try {
    await prisma.suratKeluar.delete({
      where: { id },
    });
    return { message: "Surat deleted successfully", success: true };
  } catch (error) {
    console.error("Failed to delete Surat", error);
    return { message: "Failed to delete Surat", success: false };
  }
};

export const UpdateSuratKeluar = async (id: string, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/surat/keluar");
  }
  try {
    const noSurat = formData.get("noSurat") as string;
    const prihalSurat = formData.get("prihalSurat") as string;
    const tanggalSurat = new Date(formData.get("tanggalSurat") as string);
    await prisma.suratKeluar.update({
      where: { id },
      data: {
        noSurat,
        prihalSurat,
        tanggalSurat,
      },
    });
    return { message: "Surat berhasil di update" };
  } catch (error) {
    console.error("Gagal memperbaruhui data", error);
    return { message: "Gagal memperbaruhui data", success: false };
  }
};

export async function TambahSuratMasuk(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/surat/masuk");
  }

  try {
    // Extract form data
    const noSurat = formData.get("noSurat") as string;
    const asalSurat = formData.get("asalSurat") as string;
    const prihal = formData.get("prihal") as string;
    const tanggalSurat = new Date(formData.get("tanggalSurat") as string);
    const tanggalTerimaSurat = new Date(formData.get("tanggalTerimaSurat") as string);
    const statusId = formData.get("statusId") as string;

    // Create new surat masuk
    await prisma.suratMasuk.create({
      data: {
        noSurat,
        asalSurat,
        prihal,
        tanggalSurat,
        tanggalTerimaSurat,
        statusId,
      },
    });

    return {
      success: true,
      message: "Surat Masuk berhasil ditambahkan",
    };
  } catch (error) {
    console.error("Gagal menambahkan Surat Masuk:", error);
    return {
      success: false,
      message: "Gagal menambahkan Surat Masuk",
    };
  }
}

export async function UpdateSuratMasuk(id:string, formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/surat/masuk");
  }

  try {
    // Extract form data
    const noSurat = formData.get("noSurat") as string;
    const asalSurat = formData.get("asalSurat") as string;
    const prihal = formData.get("prihal") as string;
    const tanggalSurat = new Date(formData.get("tanggalSurat") as string);
    const tanggalTerimaSurat = new Date(formData.get("tanggalTerimaSurat") as string);
    const statusId = formData.get("statusId") as string;

    // Create new surat masuk
    await prisma.suratMasuk.update({
      where: { id },
      data: {
        noSurat,
        asalSurat,
        prihal,
        tanggalSurat,
        tanggalTerimaSurat,
        statusId,
      },
    });

    return {
      success: true,
      message: "Surat Masuk berhasil ditambahkan",
    };
  } catch (error) {
    console.error("Gagal menambahkan Surat Masuk:", error);
    return {
      success: false,
      message: "Gagal menambahkan Surat Masuk",
    };
  }
}

export const deleteSuratMasuk = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/surat/masuk");
  }
  try {
    await prisma.suratMasuk.delete({
      where: { id },
    });
    return { message: "Surat deleted successfully", success: true };
  } catch (error) {
    console.error("Failed to delete Surat", error);
    return { message: "Failed to delete Surat", success: false };
  }
};