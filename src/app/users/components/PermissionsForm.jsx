import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const PermissionsForm = ({setPermissionsDialog}) => {
  return (
    <form action="">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name"> Nombre </Label>
          <Input id="name" placeholder="Nombre del permiso" />
        </div>
        <div>
          <Label htmlFor="code"> Código </Label>
          <Input id="code" placeholder="Ejemplo: HOME_PRVLEGES" />
        </div>
      </div>
      <div className="mt-2"></div>
      <div className="mt-2">
        <Label htmlFor="description"> Descripción </Label>
        <Textarea id="description" placeholder="Descripción corta sobre el permiso" className="mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-8">
        <Button type="button" className="bg-accent" onClick={() => {setPermissionsDialog(false)}}>Cancelar</Button>
        <Button >Agregar permiso</Button>
      </div>
    </form>
  );
};
