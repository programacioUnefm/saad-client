import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editUserAsync } from "@/features/control/usuarios/UsersThunks";
import { dialogChange } from "@/features/ui/UiSlice";

export const EditUser = ({ open, setAction, user, dialogAction }) => {
  const { email, document_id, last_name, name, id } = user;
  const editUser = {
    email,
    document_id,
    last_name,
    name,
    id,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: editUser,
  });
  const [ResetPassword, setResetPassword] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const resp = await dispatch(editUserAsync(data));
    if (resp == 200) {
      setAction({ dialog: false, action: "", arrayItem: {} });
      dispatch(
        dialogChange({
          title: "El usuario fué editado",
          status: true,
          duration: 3000,
          variant: "",
        })
      );
      setTimeout(() => {
        dispatch(
          dialogChange({
            title: "",
            status: false,
            duration: 3000,
            variant: "",
          })
        );
      }, 3000);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="mb-8">{`Editando el usuario "${user.name}"`}</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <Label htmlFor="name">Nombres</Label>
                <Input type="text" id="name" {...register("name")} />
              </div>
              <div className="">
                <Label htmlFor="last_name">Apellidos</Label>
                <Input type="text" id="last_name" {...register("last_name")} />
              </div>
              <div className="">
                <Label htmlFor="document_id">Número de cédula</Label>
                <Input
                  type="text"
                  id="document_id"
                  {...register("document_id")}
                />
              </div>
              <div className="">
                <Label htmlFor="email">Correo</Label>
                <Input type="text" id="email" {...register("email")} />
              </div>
            </div>
            {!ResetPassword ? null : (
              <>
                <div className="text-center my-4">
                  <h2>Cambiar contraseña</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <Input
                      type="password"
                      id="password"
                      {...register("password")}
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="re_password">Repita contraseña</Label>
                    <Input
                      type="password"
                      id="re_password"
                      {...register("c_password")}
                    />
                  </div>
                </div>
              </>
            )}
          </DialogHeader>
          <DialogFooter className="mt-8">
            <Button
              className="bg-accent hover:bg-accent/50"
              type="button"
              onClick={() => {
                setAction({ dialog: false, action: "" });
              }}
            >
              Cancelar
            </Button>
            <Button
              className="bg-accent hover:bg-accent/50"
              type="button"
              onClick={() => setResetPassword(!ResetPassword)}
            >
              {ResetPassword ? "Dejar contraseña" : "Nueva contraseña"}
            </Button>
            <Button type="submit">Editar usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
