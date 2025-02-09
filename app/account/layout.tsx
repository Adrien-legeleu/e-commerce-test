import { Sidebar } from "@/components/account/SideBar";
import Header from "@/components/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentification",
  description: "Pages d'authentification",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  gap-10">
      <Sidebar />
      <div className="p-10">{children}</div>
    </div>
  );
}
