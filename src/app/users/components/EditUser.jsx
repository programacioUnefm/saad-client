import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";

export const EditUser = ({ open, setAction, user, dialogAction }) => {
  const [ResetPassword, setResetPassword] = useState(false);
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">{`Estamos editando el usuario "${user.name}"`}</DialogTitle>
          <form action="">
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <Label htmlFor="name">Nombres</Label>
                <Input type="text" id="name" />
              </div>
              <div className="">
                <Label htmlFor="last_name">Apellidos</Label>
                <Input type="text" id="last_name" />
              </div>
              <div className="">
                <Label htmlFor="document_id">Número de cédula</Label>
                <Input type="text" id="document_id" />
              </div>
              <div className="">
                <Label htmlFor="email">Correo</Label>
                <Input type="text" id="email" />
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
                    <Input type="text" id="password" />
                  </div>
                  <div className="">
                    <Label htmlFor="re_password">Repita contraseña</Label>
                    <Input type="text" id="re_password" />
                  </div>
                </div>
              </>
            )}
          </form>
        </DialogHeader>
        <DialogFooter className="mt-8">
          <Button
            className="bg-accent hover:bg-accent/50"
            onClick={() => {
              setAction({ dialog: false, action: "" });
            }}
          >
            Cancelar
          </Button>
          <Button
            className="bg-accent hover:bg-accent/50"
            onClick={() => setResetPassword(!ResetPassword)}
          >
            {ResetPassword ? "Dejar contraseña" : "Cambiar contraseña"}
          </Button>
          <Button>Editar usuario</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
