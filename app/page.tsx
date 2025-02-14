"use client";
import { getAllProducts } from "@/lib/actionAdmin";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProductType } from "./admin/dashboard/page";
import Link from "next/link";
import { IconHeart, IconShoppingCartPlus } from "@tabler/icons-react";
import {
  addProductToCart,
  addProductToFavourite,
  findCart,
  findFavourite,
} from "@/lib/actionCartFavourite";

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productIdsToCart, setProductIdsToCart] = useState<string[]>([]);
  const [productIdsToFavourite, setProductIdsToFavourite] = useState<string[]>(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = session?.user?.id;
      if (!userId) return;
      try {
        const fetchedProducts = await getAllProducts(userId);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    const fetchProductsIdsToCart = async () => {
      const userId = session?.user?.id;
      if (!userId) return;
      try {
        const fetchCart = await findCart(userId);
        setProductIdsToCart(fetchCart?.productIds || []);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
      }
    };
    const fetchProductsIdsToFavourite = async () => {
      const userId = session?.user?.id;
      if (!userId) return;
      try {
        const fetchCart = await findFavourite(userId);
        setProductIdsToFavourite(fetchCart?.productIds || []);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
      }
    };

    fetchProducts();
    fetchProductsIdsToCart();
    fetchProductsIdsToFavourite();
  }, [session]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  const addToCart = async (productId: string, userId: string) => {
    try {
      const cart = await addProductToCart(userId, productId);
      if (!cart) {
        console.error("Erreur lors de l'ajout au panier");
        return;
      }
      setProductIdsToCart((prev) => [...prev, productId]);
      console.log("Produit ajouté au panier");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  const addToFavourite = async (productId: string, userId: string) => {
    try {
      const favourite = await addProductToFavourite(userId, productId);
      if (!favourite) {
        console.error("Erreur lors de l'ajout aux favoris");
        return;
      }
      setProductIdsToFavourite((prev) => [...prev, productId]);
      console.log("Produit ajouté aux favoris");
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris:", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1>E-commerce site</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-4 gap-10 py-20">
          {products.map((product) => (
            <div
              className="relative p-8 bg-neutral-100 rounded-3xl"
              key={product.id}
            >
              <Link href={`/${product.id}`}>
                <h1 className="text-xl">{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>{product.price} euros</p>
                <p>{product.stock} en stock</p>
                <p>{product.sexe}</p>
              </Link>
              <div className="absolute bottom-2 right-2 flex gap-2">
                {!productIdsToFavourite.includes(product.id) && (
                  <IconHeart
                    stroke={2}
                    onClick={() => addToFavourite(product.id, product.userId)}
                  />
                )}
                {!productIdsToCart.includes(product.id) && (
                  <IconShoppingCartPlus
                    onClick={() => addToCart(product.id, product.userId)}
                    stroke={2}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Aucun produit trouvé</div>
      )}
    </div>
  );
}
