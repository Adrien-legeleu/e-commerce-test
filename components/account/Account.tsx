import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Account() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user.role == "USER" ? (
        <Link href={"admin/dashboard/signin"}>
          <Button>Devenir admin</Button>
        </Link>
      ) : (
        <Link href={"admin/dashboard"}>
          <Button>votre dashboard</Button>
        </Link>
      )}
    </div>
  );
}
