"use client";
import { getAllProducts, deleteProduct } from "@/lib/actionAdmin";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ProductType } from "@/app/admin/dashboard/page";
import { IconTrashFilled } from "@tabler/icons-react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    if (session?.user.id) {
      // Déclare une fonction asynchrone à l'intérieur du useEffect
      const fetchProducts = async () => {
        try {
          const allProducts = await getAllProducts(session.user.id);
          setProducts(allProducts);
        } catch (error) {
          console.error("Erreur lors de la récupération des produits", error);
        }
      };

      fetchProducts();
    }
  }, [session?.user.id]);

  const handleDeleteProduct = async (id: string, userId: string) => {
    try {
      const productDeleted = await deleteProduct(id, userId);
      if (!productDeleted) {
        console.error("product doesn't exist error");

        router.push("/admin/dashboard");
        return;
      }
      setProducts((products) =>
        products.filter((product) => product.id !== id)
      );
      console.log("success");
    } catch (error) {
      console.error("error deleting product" + error);
    }
  };
  return (
    <div className="px-10">
      {products?.length > 0 ? (
        <div>
          <div className="flex p-5 w(full items-center justify-center">
            <h2>Vos produits :</h2>
            <Link href={"/admin/dashboard/create-product"}>
              {" "}
              <Button>Ajouter un produit</Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="p-8 bg-neutral-100 relative rounded-3xl"
                >
                  <div
                    className="absolute bottom-2 right-2 h-6 w-6 cursor-pointer"
                    onClick={() =>
                      handleDeleteProduct(product.id, product.userId)
                    }
                  >
                    <IconTrashFilled stroke={2} className="h-full w-full" />
                  </div>
                  <Link href={`/admin/dashboard/${product.id}`}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Link href={"/admin/dashboard/create-product"}>
          <Button>Créer votre premier produit</Button>
        </Link>
      )}
    </div>
  );
}
