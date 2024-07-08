import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addPermissionAsync,
  editPermission,
} from "../../../features/control/usuarios/UsersThunks";
import { useToast } from "../../../components/ui/use-toast";
import { ParentIdAssign } from "./tabs/components/PermissionsAcctions/ParentIdAssign";

export const PermissionsForm = ({ setPermissionsDialog, data = undefined }) => {
  const { permissionsFull } = useSelector((state) => state.usersList);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [open, setopen] = useState(false);
  const onSubmit = async (formData) => {
    if (data == undefined) {
      const dataResult = { ...formData, parent_id: formData.parent_id.id };
      const resp = await dispatch(addPermissionAsync(dataResult));
      if (resp == 200) {
        toast({
          title: `El permiso "${formData.name}" fué agregado.`,
        });
        setPermissionsDialog(false);
      }
    } else {
      const resp = await dispatch(editPermission(formData));
      if (resp == 200) {
        toast({
          title: `El permiso "${formData.name}" fué editado.`,
        });
        setPermissionsDialog({
          dialog: false,
          action: "",
          arrayItem: {},
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ParentIdAssign open={open} setValue={setValue} setopen={setopen} />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name"> Nombre </Label>
          <Input
            id="name"
            placeholder="Nombre del permiso"
            {...register("name", {
              required: { value: true, message: "El campo es requerido." },
              minLength: { value: 3, message: "Minimo 3 caracteres." },
              maxLength: { value: 70, message: "maximo 20 caracteres." },
            })}
          />
        </div>
        <div>
          <Label htmlFor="code"> Código </Label>
          <Input
            id="code"
            placeholder="Ejemplo: HOME_PRVLEGES"
            {...register("code", {
              required: { value: true, message: "El campo es requerido." },
              minLength: { value: 3, message: "Minimo 3 caracteres." },
              maxLength: { value: 70, message: "maximo 70 caracteres." },
            })}
          />
          <span>asdasdas</span>
        </div>
      </div>
      <div className="mt-2">
        <Label htmlFor="description"> Descripción </Label>
        <Textarea
          id="description"
          {...register("description", {
            required: { value: true, message: "El campo es requerido." },
            maxLength: { value: 80, message: "maximo 30 caracteres." },
          })}
          placeholder="Descripción corta sobre el permiso"
          className="mt-2"
        />
      </div>
      <div className="mt-4">
        <span
          className={
            watch().parent_id != undefined && watch().parent_id != ""
              ? "text-sm"
              : "text-muted-foreground text-sm"
          }
        >
          {watch().parent_id != undefined && watch().parent_id != "" ? (
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm uppercase">
                Permiso padre:{" "}
                <span className="text-accent-foreground">
                  {watch().parent_id.name}
                </span>
              </span>
              <span className="text-muted-foreground text-sm uppercase">
                Código:{" "}
                <span className="text-accent-foreground">
                  {watch().parent_id.code}
                </span>
              </span>
            </div>
          ) : (
            "No posée un permiso padre"
          )}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-8">
        <Button
          type="button"
          className="bg-accent"
          onClick={() => {
            setPermissionsDialog(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          className={
            watch().parent_id != undefined &&
            watch().parent_id != "" &&
            "bg-primary"
          }
          onClick={() => setopen(true)}
        >
          {watch().parent_id != undefined && watch().parent_id != ""
            ? "Cambiar padre"
            : "Asignar padre"}
        </Button>
        <Button type="submit">
          {
            data == undefined?
            "Agregar permiso"
            :"Editar permiso"
          }
        </Button>
      </div>
    </form>
  );
};
