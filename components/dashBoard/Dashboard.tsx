"use client";
import { getAllProducts } from "@/lib/actionAdmin";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ProductType } from "@/app/admin/dashboard/page";

export default function Dashboard() {
  const { data: session } = useSession();
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
                <Link
                  href={`/admin/dashboard/${product.id}`}
                  key={product.id}
                  className="p-8 bg-neutral-100 inline-block rounded-3xl"
                >
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </Link>
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
