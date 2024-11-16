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
import { CircleUser } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link, Navigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

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

  const [dialog, setdialog] = useState({ status: false, component: null });

  return (
    <>
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
          <DropdownMenuLabel className="uppercase font-bold">
            Mi cuenta
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={"/mi-cuenta"}>
          <DropdownMenuItem className="uppercase text-[12px]" >
            Ver mi perfil
          </DropdownMenuItem>
          </Link>
          
          
          {/* <DropdownMenuItem
            className="uppercase text-[12px]"
            onClick={() => setdialog({ status: true, component: "mypermiss" })}
          >
            Mis permisos
          </DropdownMenuItem> */}
          <div className="mt-4 mb-2 px-2 mr-2">
            <ModeToggle />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="uppercase text-[12px]" onClick={signOut}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
