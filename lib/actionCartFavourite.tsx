"use server";
import { prisma } from "./prisma";

export const findCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  return cart;
};
export const findFavourite = async (userId: string) => {
  const favourite = await prisma.favourite.findUnique({ where: { userId } });
  return favourite;
};

export const addProductToCart = async (userId: string, productId: string) => {
  if (!userId || !productId) {
    throw new Error("userId ou productId n'existent pas");
  }
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });
  let newCart = undefined;
  if (!cart) {
    newCart = await prisma.cart.create({
      data: {
        userId,
        productIds: [productId],
      },
    });
  } else {
    if (!cart.productIds.includes(productId)) {
      newCart = await prisma.cart.update({
        where: { userId },
        data: {
          productIds: {
            push: productId,
          },
        },
      });
    } else {
      throw new Error("productId existe deja");
    }
  }
  return newCart;
};

export const removeProductToCart = async (
  productId: string,
  userId: string
) => {
  if (!userId || !productId) {
    throw new Error("userId ou productId n'existent pas");
  }
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });
  if (cart) {
    const updateProductIds = cart.productIds.filter((id) => id !== productId);
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: {
        productIds: updateProductIds,
      },
    });
    return updatedCart;
  } else {
    throw new Error("panier non trouvé");
  }
};
export const addProductToFavourite = async (
  userId: string,
  productId: string
) => {
  if (!userId || !productId) {
    throw new Error("userId ou productId n'existent pas");
  }
  const favourite = await prisma.favourite.findUnique({
    where: { userId },
  });
  let newFavourite = undefined;
  if (!favourite) {
    newFavourite = await prisma.favourite.create({
      data: {
        userId,
        productIds: [productId],
      },
    });
  } else {
    if (!favourite.productIds.includes(productId)) {
      newFavourite = await prisma.favourite.update({
        where: { userId },
        data: {
          productIds: {
            push: productId,
          },
        },
      });
    } else {
      throw new Error("productId existe deja");
    }
  }
  return newFavourite;
};

export const removeProductToFavourite = async (
  productId: string,
  userId: string
) => {
  if (!userId || !productId) {
    throw new Error("userId ou productId n'existent pas");
  }
  const favourite = await prisma.favourite.findUnique({
    where: { userId },
  });
  if (favourite) {
    const updateProductIds = favourite.productIds.filter(
      (id) => id !== productId
    );
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: {
        productIds: updateProductIds,
      },
    });
    return updatedCart;
  } else {
    throw new Error("panier non trouvé");
  }
};
