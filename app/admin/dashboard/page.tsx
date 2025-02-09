"use client";

import { useSession } from "next-auth/react";

import AdminSIgnIn from "@/components/admin/AdminSignIn";
import Dashboard from "@/components/dashBoard/Dashboard";
import { Category, Sexe } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface ProductType {
  id: string;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  category: Category;
  sexe: Sexe;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated" && !session) {
      router.push("/auth/signin");
    }
  }, [router, status]);
  if (status === "loading") return <p>Chargement...</p>;

  return (
    <div className="w-full h-[calc(100vh-64px)] pb-20 flex items-center justify-center flex-col">
      <h1>Dashboard Admin</h1>
      {session?.user.role === "ADMIN" && session?.user.id ? (
        <Dashboard />
      ) : (
        <AdminSIgnIn />
      )}
    </div>
  );
}
