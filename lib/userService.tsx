"use client";

import { useSession } from "next-auth/react";

export const getuser = () => {
  const { data: session, status } = useSession();
  return { user: session?.user, status };
};
