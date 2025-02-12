"use client";
import { getProduct } from "@/lib/actionAdmin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductType } from "../page";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
interface Params {
  id: string;
}

export default function page({ params }: { params: Params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isUpdated, setIsUpdated] = useState(false);

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

  const handleIsUpdating = () => {
    setIsUpdated(!isUpdated);
  };

  return (
    <div className=" flex w-full items-center flex-col justify-center">
      {isUpdated ? (
        <form></form>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="p-8 bg-neutral-200 rounded-3xl">
            <h1>{product?.name}</h1>
            <h3>{product?.description}</h3>
            <h3>{product?.price} euro</h3>
            <h3>{product?.sexe}</h3>
            <h3>{product?.stock} en stock</h3>
          </div>
          <Button onClick={handleIsUpdating}>Modifier</Button>
        </div>
      )}
      <Button
        variant={"secondary"}
        // onClick={() => handleDeleteProduct(session.user.id, params.id)}
      >
        Supprimer
      </Button>
    </div>
  );
}
