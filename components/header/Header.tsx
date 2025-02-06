"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between p-4 items-center fixed left-0 top-0 w-full">
      <span> E commerce</span>
      <ul className="flex justify-center gap-5 items-center">
        <li>Homme</li>
        <li>Femme</li>
        <li>Enfant</li>
      </ul>
      <div className="flex justify-center gap-5 items-center">
        {!session ? (
          <div className="flex justify-center gap-5 items-center">
            <Link href={"/auth/signin"}>
              <Button>Se connecter</Button>
            </Link>
            <Link href={"/auth/sinup"}>
              <Button>créer un compte</Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center gap-5 items-center">
            <Link href={"/account"}>
              <Button>votre compte</Button>
            </Link>

            <Button onClick={handleSignOut}>se déconnecter</Button>

            {session.user.role == "USER" ? (
              <Link href={"/dashboard/signin"}>
                <Button>se connecter au dashboard</Button>
              </Link>
            ) : (
              <Link href={"/dashboard"}>
                <Button>votre dashboard</Button>
              </Link>
            )}
          </div>
        )}
        <div>
          <Link href={"/cart"}>
            <Button>Panier</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
