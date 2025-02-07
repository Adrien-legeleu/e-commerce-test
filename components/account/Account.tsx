"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Account() {
  const { data: session } = useSession();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log(session?.user.id + " ueueueueu");

    if (!session?.user.id) {
      setError("Utilisateur non authentifié");
      return;
    }
    try {
      const res = await fetch("/api/admin/role", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, role: "ADMIN", code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la mise a jour");
      } else {
        console.log("success");

        window.location.href = "/";
      }
    } catch (error) {
      setError("Errur réseau");
      console.error(error);
    }
  };
  return (
    <div className="h-screen w-full items-center justify-center flex">
      {session?.user.role == "USER" ? (
        <Link href={"admin/dashboard"}>
          <Button>Devenir admin</Button>
        </Link>
      ) : (
        <Link href={"admin/dashboard"}>
          <Button>votre dashboard</Button>
        </Link>
      )}
      {session?.user.role === "ADMIN" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Se déconnecter de l'admin</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Redevenir User</DialogTitle>
              <DialogDescription>
                entrez le meme code qu'a l'inscription. Vous devrez re vous
                inscrire pour avir ce role d'admin
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit}>
              <Label htmlFor="code">Le code</Label>
              <Input
                type="password"
                id="code"
                name="code"
                onChange={(e) => setCode(e.target.value)}
                placeholder="entrez le code pour vous connecter"
              />
              <Button type="submit">Valider</Button>
              {error && <p>{error}</p>}
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
