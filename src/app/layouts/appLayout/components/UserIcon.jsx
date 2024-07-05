import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useToast } from "../../../../components/ui/use-toast";
import { LogOutApp } from "../../../../features/auth/LoginThunk";
import { CircleUser, Moon, Sun } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const UserIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const signOut = () => {
    dispatch(LogOutApp());
    toast({
      title: `Estás cerrando sesión`,
      description: "Que tengas buen día.",
    });
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          style={{ with: "300px" }}
        >
          <CircleUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuItem>Mis permisos</DropdownMenuItem>
        <div className="mt-2 px-2 mr-2">
          <ModeToggle />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
