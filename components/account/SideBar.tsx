"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconChevronUp, IconCirclePlusFilled } from "@tabler/icons-react";
import AccountAdmin from "./AccountAdmin";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

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

export function AppSidebar() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };
  return (
    <Sidebar className="top-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex flex-col items-start">
                      <div className="flex items-center">
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </div>
                      {item.subtitles && (
                        <div className="mt-1">
                          {item.subtitles.map((subtitle, index) => (
                            <a
                              key={index}
                              href={subtitle.url}
                              className="block text-sm text-muted-foreground"
                            >
                              {subtitle.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <IconCirclePlusFilled /> PLUS
                  <IconChevronUp className="ml-auto" />
                </SidebarMenuButton>
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
