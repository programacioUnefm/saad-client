import { Button } from "@/components/ui/button";
import { Pencil, Terminal, Trash } from "lucide-react";
import React from "react";

export const ButtonsActions = ({setAction, user}) => {
  return (
    <>
      <Button
        disabled={user.id == 1}
        className="bg-accent hover:bg-accent/50"
        onClick={() => setAction({ dialog: true, action: "edit", user: user })}
      >
        <span className="hidden md:block">Editar</span>
        <span className="block md:hidden">
          <Pencil className="text-sm" />
        </span>
      </Button>
      <Button
        disabled={user.id == 1}
        className="bg-accent hover:bg-accent/50"
        onClick={() => setAction({ dialog: true, action: "role", user: user })}
      >
        <span className="hidden md:block">roles</span>
        <span className="block md:hidden">
          <Terminal className="text-sm" />
        </span>
      </Button>
      <Button
        disabled={user.id == 1}
        className="bg-destructive hover:bg-destructive/50"
        onClick={() =>
          setAction({ dialog: true, action: "delete", user: user })
        }
      >
        <span className="hidden md:block">Eliminar</span>
        <span className="block md:hidden">
          <Trash className="text-sm" />
        </span>
      </Button>
    </>
  );
};
