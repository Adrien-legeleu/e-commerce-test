"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Category, Sexe } from "@prisma/client";

export const getAllProducts = async (userId: string) => {
  const products = await prisma.product.findMany({ where: { userId } });
  return products;
};

export const createProduct = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string, 10);
  const sexe = formData.get("sexe") as Sexe;
  const category = formData.get("category") as Category;
  const userId = formData.get("userId") as string;
  if (!name || !sexe || !category || !price || !stock || !userId) {
    throw new Error(
      "Tous les champs champs mise à part 'desciption' doivent être requis !"
    );
  }
  await prisma.product.create({
    data: {
      userId,
      stock,
      sexe,
      category,
      price,
      name,
      description,
    },
  });
  revalidatePath("/admin/dashboard");
};
