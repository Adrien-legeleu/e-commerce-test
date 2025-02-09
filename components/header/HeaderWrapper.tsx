"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathName = usePathname();
  const isAuthpage = pathName.startsWith("/auth");
  console.log(isAuthpage);

  if (isAuthpage) {
    return null;
  }
  return <Header />;
}
