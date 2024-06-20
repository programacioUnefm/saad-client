import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const PermissionsForm = () => {
  return (
    <form action="">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name"> Nombre </Label>
          <Input id="name" />
        </div>
        <div>
          <Label htmlFor="code"> Código </Label>
          <Input id="code" />
        </div>
      </div>
      <div className="mt-2">
        
      </div>
      <div className="mt-2">
        <Label htmlFor="description"> Descripción </Label>
        <Textarea id="description" className="mt-2" />
      </div>
    </form>
  );
};
