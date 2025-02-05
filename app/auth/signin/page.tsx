// app/auth/signin/page.tsx
"use client";

import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const prov = await getProviders();
      setProviders(prov);
    })();
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Se connecter</h1>

      {/* Formulaire pour le Credentials Provider */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          console.log("Résultat de signIn:", res);
          // Si la connexion est réussie, redirige
          if (res?.ok) {
            router.push("/");
          } else {
            // Vous pouvez afficher une erreur à l'utilisateur
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Connexion
        </button>
      </form>

      {/* Boutons pour les autres providers */}
      {providers &&
        Object.values(providers)
          .filter((provider: any) => provider.id !== "credentials")
          .map((provider: any) => (
            <div key={provider.name} className="mb-4">
              <button
                onClick={() => signIn(provider.id)}
                className="bg-gray-200 p-2 rounded"
              >
                Se connecter avec {provider.name}
              </button>
            </div>
          ))}
    </div>
  );
}
