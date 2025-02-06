import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import SessionWrapper from "@/components/ui/SessionWrapper";

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
        <body className={` antialiased`}>
          {" "}
          <header>
            <Header />
          </header>
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
