"use client";
import { getuser } from "@/lib/userService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Info() {
  const { user, status } = getuser();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/singin");
    }
  }, [router, user, status]);
  if (status == "loading") {
    return <p>chargement</p>;
  }
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>Bonjour , {user.name}</h1>
    </div>
  );
}
