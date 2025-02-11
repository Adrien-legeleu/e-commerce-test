"use client";
import { getProduct } from "@/lib/actionAdmin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductType } from "../page";
import { useSession } from "next-auth/react";
interface Params {
  id: string;
}

export default function page({ params }: { params: Params }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [product, setproduct] = useState<ProductType>();
  useEffect(() => {
    const fetchProduct = async (userId: string, id: string) => {
      try {
        const fettchingProduct = await getProduct(userId, id);
        if (!fettchingProduct) {
          console.error("product doesn't exist");
          router.push("/admin/dashboard");
          return;
        }
        setproduct(fettchingProduct);
      } catch (error) {
        console.error("error fetching product" + error);
      }
    };

    if (session?.user.id) {
      fetchProduct(session.user.id, params.id);
    }
  }, [session, router, product]);
  return (
    <div>
      <h1>{product?.name}</h1>
      <h3>{product?.description}</h3>
      <h3>{product?.price} euro</h3>
      <h3>{product?.sexe}</h3>
      <h3>{product?.stock} en stock</h3>
    </div>
  );
}
