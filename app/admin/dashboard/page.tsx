"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSIgnIn from "@/components/admin/AdminSignIn";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated" && session.user?.role !== "ADMIN") {
  //     router.push("admin/dashboard/signin");
  //   }
  // }, [status, session, router]);

  if (status === "loading") return <p>Chargement...</p>;

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <h1>Dashboard Admin</h1>
      {session?.user.role === "ADMIN" ? (
        <div>Bienvenur sur votre dashboard</div>
      ) : (
        <AdminSIgnIn />
      )}
    </div>
  );
}
