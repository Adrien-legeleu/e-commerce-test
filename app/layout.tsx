import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/ui/SessionWrapper";
import HeaderWrapper from "@/components/header/HeaderWrapper";

export const metadata: Metadata = {
  title: "Ecommerce app ",
  description: "votre boutique e commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="fr">
        <body className={` antialiased `}>
          {" "}
          <header>
            <HeaderWrapper />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </SessionWrapper>
  );
}
