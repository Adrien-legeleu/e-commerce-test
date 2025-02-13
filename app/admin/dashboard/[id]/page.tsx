"use client";
import { getProduct, updateProduct } from "@/lib/actionAdmin";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductType } from "../page";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Sexe } from "@prisma/client";

export interface FormDataUpdateProps {
  productId: string;
  name: string;
  price: number;
  description: string | null;
  stock: number;
  sexe: Sexe;
  category: Category;
  userId: string;
}

export default function Page() {
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const { data: session } = useSession();
  const [isUpdated, setIsUpdated] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [formData, setFormData] = useState<FormDataUpdateProps | null>(null);

  useEffect(() => {
    const fetchProduct = async (userId: string, id: string) => {
      try {
        const fetchedProduct = await getProduct(userId, id);
        if (!fetchedProduct) {
          console.error("Product doesn't exist");
          router.push("/admin/dashboard");
          return;
        }
        setProduct(fetchedProduct);
        setFormData({
          productId: fetchedProduct.id,
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          stock: fetchedProduct.stock,
          sexe: fetchedProduct.sexe,
          category: fetchedProduct.category,
          description: fetchedProduct.description,
          userId: fetchedProduct.userId,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (session?.user.id) {
      fetchProduct(session.user.id, productId);
    }
  }, [session, router, productId]);

  const handleIsUpdating = () => {
    setIsUpdated((prev) => !prev);
  };

  const handleFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "price" || name === "stock" ? Number(value) : value,
      });
    }
  };

  const handleSelectChange = (
    name: keyof FormDataUpdateProps,
    value: string
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [name]: value as Sexe | Category,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    try {
      console.log("Données envoyées :", formData);
      const newProduct = await updateProduct(formData);
      if (newProduct) {
        console.log("Produit modifié");
        setProduct(newProduct);
        setFormData({
          productId: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          stock: newProduct.stock,
          sexe: newProduct.sexe,
          category: newProduct.category,
          description: newProduct.description,
          userId: newProduct.userId,
        });
        handleIsUpdating();
      } else {
        console.error("Erreur lors de la modification");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
    }
  };

  return (
    <div className="flex w-full items-center flex-col justify-center">
      {isUpdated && formData ? (
        <form onSubmit={onSubmit}>
          <Input
            id="price"
            name="price"
            type="number"
            required
            placeholder="Votre prix"
            onChange={handleFormData}
            value={formData.price}
          />
          <Input
            id="name"
            name="name"
            required
            type="text"
            placeholder="Nom"
            onChange={handleFormData}
            value={formData.name}
          />
          <Input
            id="stock"
            name="stock"
            required
            type="number"
            placeholder="Stock"
            onChange={handleFormData}
            value={formData.stock}
          />
          <Textarea
            id="description"
            name="description"
            placeholder="Votre description"
            onChange={handleFormData}
            value={formData.description ?? ""}
          />

          <Select
            onValueChange={(value) => handleSelectChange("category", value)}
            required
            value={formData.category}
          >
            <SelectTrigger className="w-[180px]" id="category" name="category">
              <SelectValue
                placeholder="Choisir une catégorie"
                defaultValue={formData.category}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>CATEGORIE</SelectLabel>
                <SelectItem value={Category.COLLIER}>Collier</SelectItem>
                <SelectItem value={Category.BRACELET}>Bracelet</SelectItem>
                <SelectItem value={Category.BAGUES}>Bague</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleSelectChange("sexe", value)}
            required
            value={formData.sexe}
          >
            <SelectTrigger className="w-[180px]" id="sexe" name="sexe">
              <SelectValue
                placeholder="Choisir un sexe"
                defaultValue={formData.sexe}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>SEXE</SelectLabel>
                <SelectItem value={Sexe.FEMME}>Femme</SelectItem>
                <SelectItem value={Sexe.HOMME}>Homme</SelectItem>
                <SelectItem value={Sexe.ENFANT}>Enfant</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="destructive" type="submit">
            Modifier
          </Button>
        </form>
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
      <Button variant={"secondary"}>Supprimer</Button>
    </div>
  );
}
