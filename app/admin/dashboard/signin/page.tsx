"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function page() {
  const [code, setCode] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen w-full flex items-center justifyc-enter flex-col gap-10">
      <h1>Devenir Admin ?</h1>
      <form>
        <Label htmlFor="code">Le code</Label>
        <Input
          type="password"
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
          placeholder="entrez le code pour vous connecter"
        />
        <Button type="submit">Valider</Button>
      </form>
    </div>
  );
}
