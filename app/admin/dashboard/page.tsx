// app/admin/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirige si l'utilisateur n'est pas admin
    if (status === "authenticated" && session.user?.role !== "ADMIN") {
      router.push("/");
      //   else créer une page auth pour admin !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
  }, [status, session, router]);

  if (status === "loading") return <p>Chargement...</p>;

  return (
    <div>
      <h1>Dashboard Admin</h1>
      {/* Contenu réservé aux admins */}
    </div>
  );
}
