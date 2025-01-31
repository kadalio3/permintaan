"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { TambahUserSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";

export const AddUsers = async (
    prevState: unknown,
    formData: FormData) => {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "admin")
      redirect("/");
  
    const validatedFields = TambahUserSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    
    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    const { username, email, password } = validatedFields.data;
    const hashedPassword = hashSync(password, 10);
  
    try {
      await prisma.user.create({
        data: {
          username,
          email,
          role: "user",
          password: hashedPassword,
        },
      });
      
      return { 
        success: true,
        message: "User berhasil ditambahkan" 
      };
      
    } catch (error) {
      return { 
        success: false,
        message: "Gagal menambahkan user" 
      };
    }
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return { message: "User deleted successfully", success: true };
  } catch (error) {
    console.error("Failed to delete user", error);
    return { message: "Failed to delete user", success: false };
  }
}; 

  export const UpdateUsers = async (id: string, data: any) => {
    await prisma.user.update({
      where: { id },
      data,
    });
  };  
