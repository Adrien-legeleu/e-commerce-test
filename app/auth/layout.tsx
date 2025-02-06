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
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
