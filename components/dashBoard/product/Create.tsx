"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/actionAdmin";
import { getuserId } from "@/lib/userService";
import { Category, Sexe } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";

export interface formDataProps {
  name: string;
  price: string;
  description: string;
  stock: string;
  sexe: Sexe;
  category: Category;
  userId: string;
}

export default function Create() {
  const { userId, status } = getuserId();
  const router = useRouter();

  const [formData, setFormData] = useState<formDataProps>({
    name: "",
    price: "20",
    stock: "1",
    sexe: Sexe.FEMME,
    category: Category.COLLIER,
    description: "",
    userId: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      console.log("Vous n'êtes pas authentifié");
    } else if (status === "authenticated" && userId) {
      setFormData((prevData) => ({ ...prevData, userId }));
    }
  }, [userId, status, router]);

  const handleFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof formDataProps, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value as Sexe | Category,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Données envoyées :", formData);
      const newProduct = await createProduct(formData);
      if (newProduct) {
        console.log("produit créer");
        router.push("/admin/dashboard");
      } else {
        console.error("erreur lors de la réation");
      }
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
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
          value={formData.description}
        />

        <Select
          onValueChange={(value) => handleSelectChange("category", value)}
          required
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
          Créer
        </Button>
      </form>
    </div>
  );
}
