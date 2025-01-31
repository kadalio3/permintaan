"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function TambahSuratKeluar(formData: FormData) {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") {
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
