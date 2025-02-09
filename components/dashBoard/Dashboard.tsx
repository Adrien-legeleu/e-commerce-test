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
    <div>
      {products?.length > 0 ? (
        <div>vos prduits</div>
      ) : (
        <Link href={"/admin/dashboard/create-product"}>
          <Button>Créer votre premier produit</Button>
        </Link>
      )}
    </div>
  );
}
