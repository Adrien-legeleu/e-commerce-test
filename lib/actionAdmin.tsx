"use server";

import { prisma } from "./prisma";
import { formDataCreateProps } from "@/components/dashBoard/product/Create";

export const getAllProducts = async (userId: string) => {
  const products = await prisma.product.findMany({ where: { userId } });
  return products;
};

export const getProduct = async (userId: string, productId: string) => {
  const product = await prisma.product.findUnique({
    where: { userId, id: productId },
  });
  return product;
};

export const createProduct = async (formData: formDataCreateProps) => {
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

export const updateProduct = async (formData: any) => {
  const { name, description, stock, price, sexe, category, userId, productId } =
    formData;
  console.log(formData, productId, userId);

  if (!userId || !productId) {
    throw new Error("UserId ou id ne sont pas défini");
  }
  const existingProduct = await prisma.product.findUnique({
    where: { userId, id: productId },
  });
  if (!existingProduct) {
    throw new Error("product doesn't exist");
  }

  const productUpdated = await prisma.product.update({
    where: { id: productId, userId },
    data: {
      name: name ?? existingProduct.name,
      description: description ?? existingProduct.description,
      stock: stock ?? existingProduct.stock,
      price: price ?? existingProduct.price,
      sexe: sexe ?? existingProduct.sexe,
      category: category ?? existingProduct.category,
    },
  });
  return productUpdated;
};

export const deleteProduct = async (productId: string, userId: string) => {
  if (!userId || !productId) {
    throw new Error("UserId ou productId ne sont pas défini");
  }
  const productDelete = await prisma.product.delete({
    where: { userId, id: productId },
  });
  return productDelete;
};
