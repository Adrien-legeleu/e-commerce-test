import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Create() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <form>
        <Input name="price" type="number" />
        <Button>Créer</Button>
      </form>
    </div>
  );
}
