"use client";
import { Home, Inbox, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChevronUp, IconCirclePlusFilled } from "@tabler/icons-react";
import AccountAdmin from "./AccountAdmin";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import Link from "next/link";

const items = [
  {
    title: "Info",
    url: "#",
    icon: Home,
    subtitles: [
      { text: "Données personnelles", url: "/info/personal-data" },
      { text: "Profil utilisateur", url: "/info/user-profile" },
    ],
  },
  {
    title: "Commande",
    url: "#",
    icon: Inbox,
    subtitles: [
      { text: "Historique des commandes", url: "/orders/history" },
      { text: "Suivi des livraisons", url: "/orders/tracking" },
    ],
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
    subtitles: [
      { text: "Réglages de l'application", url: "/settings/app" },
      { text: "Préférences utilisateur", url: "/settings/user" },
    ],
  },
];

export function Sidebar() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  return (
    <div className="p-10 h-[calc(100vh-64px)]  flex flex-col justify-between rounded-3xl shadow-2xl shadow-black/20 bg-neutral-50">
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.title} className="space-y-2">
            <Link href={item.url} className="flex flex-col items-start">
              <div className="flex items-center">
                <item.icon className="mr-2" />
                <span>{item.title}</span>
              </div>
            </Link>
            <div className="">
              {item.subtitles && (
                <div className="mt-1">
                  {item.subtitles.map((subtitle, index) => (
                    <Link
                      key={index}
                      href={subtitle.url}
                      className="block text-sm text-muted-foreground"
                    >
                      {subtitle.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"}>
            <IconCirclePlusFilled /> PLUS
            <IconChevronUp className="ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="w-[--radix-popper-anchor-width] flex items-center justify-center flex-col gap-4 p-4"
        >
          <AccountAdmin />
          <Button variant={"destructive"} onClick={handleSignOut}>
            Se déconnecter
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
