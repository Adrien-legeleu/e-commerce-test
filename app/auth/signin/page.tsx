"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          console.log("Résultat de signIn:", res);

          if (res?.ok) {
            window.location.href = "/";
          } else {
            console.error("Erreur lors de la connexion :", res?.error);
          }
        }}
        className="flex flex-col gap-4 mb-8 w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <Button type="submit" variant={"destructive"}>
          Connexion
        </Button>
      </form>

      <div className="gap-2 flex flex-col">
        <Button onClick={() => signIn("github")}>
          Se connecter avec githubs
        </Button>
        <Button onClick={() => signIn("google")}>
          Se connecter avec google
        </Button>
      </div>
    </div>
  );
}
