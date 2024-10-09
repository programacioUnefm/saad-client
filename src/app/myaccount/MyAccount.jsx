import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { editUser } from "@/features/auth/LoginThunk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const MyAccount = ({ user, setdialog }) => {
  const superUserClass =
    "bg-[url('/adminAvatar.jpeg')] w-[150px] h-[150px] bg-center bg-cover rounded-full";
  const defaultUser =
    "bg-[url('/defaultAvatar.jpg')] w-[150px] h-[150px] bg-right bg-cover rounded-full";
  const [editProfile, seteditProfile] = useState(true);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      document_id: user.document_id,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    const resp = await dispatch(editUser(data));
    if(resp){
        seteditProfile(true);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <div
          className={
            user.roleList.every((role) => role.includes("ADMIN"))
              ? superUserClass
              : defaultUser
          }
        />
      </div>
      <TooltipProvider >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold uppercase mt-2 text-[20px]">{user.name}</h2>
        <div className="my-2 flex gap-2 justify-center">
          {user.roles.map((rol) => (
            
              <Tooltip key={rol.id}>
                <TooltipTrigger>
                  <Badge className="bg-accent uppercase text-foreground hover:text-white">{rol.name}</Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <p>{rol.description}</p>
                </TooltipContent>
              </Tooltip>
            
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 mb-2">
          <div className="flex flex-col items-start">
            <span className="text-foreground/80">Nombres</span>
            <Input
              disabled={editProfile}
              {...register("name", { required: true, maxLength: 20 })}
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-foreground/80">Apellidos</span>
            <Input
              disabled={editProfile}
              {...register("last_name", { maxLength: 20 })}
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-foreground/80">Documento</span>
            <Input
              disabled={editProfile}
              {...register("document_id", { required: true, maxLength: 20 })}
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-foreground/80">Correo electrónico</span>
            <Input
              disabled={editProfile}
              type="email"
              {...register("email", { required: true, maxLength: 20 })}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setdialog({ status: false, component: "" })}
          >
            Cerrar
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => seteditProfile(!editProfile)}
          >
            {editProfile ? "Editar datos" : "Cancelar"}
          </Button>
          {!editProfile ? (
            <Button type="submit">Enviar datos</Button>
          ) : (
            <Button
              variant="outline"
              type="button">
              Cambiar clave
            </Button>
          )}
        </div>
      </form>
      </TooltipProvider>
    </div>
  );
};
