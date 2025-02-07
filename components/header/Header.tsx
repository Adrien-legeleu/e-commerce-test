"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  IconUserCircle,
  IconShoppingCartFilled,
  IconHeart,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(session?.user);
  }, [session]);

  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="grid grid-cols-3 py-4 items-center px-12 fixed left-0 top-0 w-full">
      <ul className="flex justify-start gap-5 items-center">
        <li>Homme</li>
        <li>Femme</li>
        <li>Enfant</li>
      </ul>
      <Link href={"/"} className="mx-auto">
        {" "}
        <span className="text-2xl tracking-wider font-semibold ">
          E commerce
        </span>
      </Link>
      <div className="flex justify-end gap-5 items-center">
        <div className="flex justify-center gap-5 items-center">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              asChild
              className="outline-none"
            >
              <Link href={"/account"}>
                <IconUserCircle className="w-7 h-7" stroke={2} />
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="p-5"
            >
              <div className="flex flex-col  ">
                {!session ? (
                  <div className="gap-1 flex flex-col">
                    <Link href={"/auth/signin"} className="w-full">
                      <Button className="w-full" variant={"destructive"}>
                        Se connecter
                      </Button>
                    </Link>
                    <p className="text-sm ">
                      <Link href={"/auth/signup"}>
                        <Button className="text-blue-500 px-0" variant={"link"}>
                          S'inscrire
                        </Button>
                      </Link>
                      - en un clin d'œil
                    </p>
                  </div>
                ) : (
                  <Button onClick={handleSignOut} variant={"destructive"}>
                    se déconnecter
                  </Button>
                )}
                <Link href={"/account"}>
                  <Button variant={"ghost"}>Aperçu de mon compte</Button>
                </Link>
                {session?.user.role == "ADMIN" && (
                  <Link href={"admin/dashboard"}>
                    <Button variant={"ghost"}>votre dashboard</Button>
                  </Link>
                )}
              </div>
            </DropdownMenuContent>
            <Link href={"/favorite"}>
              <IconHeart className="h-7 w-7" stroke={2} />
            </Link>
          </DropdownMenu>
          <Link href={"/cart"}>
            <IconShoppingCartFilled className="h-7 w-7" stroke={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
