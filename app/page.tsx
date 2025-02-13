"use client";
import { getAllProducts } from "@/lib/actionAdmin";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProductType } from "./admin/dashboard/page";

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<ProductType[]>([]);

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
    fetchProducts();
  }, [session]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>E commerce site</h1>
      {products.length > 0 ? (
        products.map((product) => <div key={product.id}>{product.name}</div>)
      ) : (
        <div>Aucun produit trouvé</div>
      )}
    </div>
  );
}
