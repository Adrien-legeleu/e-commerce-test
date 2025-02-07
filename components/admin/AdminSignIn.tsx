"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminSIgnIn() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
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
        body: JSON.stringify({ userId: session.user.id, role: "USER", code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de la mise a jour");
      } else {
        console.log("success");

        window.location.reload();
      }
    } catch (error) {
      setError("Errur réseau");
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">devenir admin</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>devenir admin</DialogTitle>
            <DialogDescription>
              entre le code pour devenir admin
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
    </div>
  );
}
