"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Category, Sexe } from "@prisma/client";
import { formDataProps } from "@/components/dashBoard/product/Create";

export const getAllProducts = async (userId: string) => {
  const products = await prisma.product.findMany({ where: { userId } });
  return products;
};

export const createProduct = async (formData: formDataProps) => {
  const { name, description, stock, price, sexe, category, userId } = formData;

  if (
    !name?.trim() ||
    !sexe ||
    !category ||
    price === null ||
    price === undefined ||
    stock === null ||
    stock === undefined ||
    !userId?.trim()
  ) {
    throw new Error(
      "Tous les champs (sauf 'description') doivent être remplis !"
    );
  }

  const product = await prisma.product.create({
    data: {
      userId,
      stock: parseInt(stock),
      sexe,
      category,
      price: parseFloat(price),
      name,
      description,
    },
  });

  return product;
};
