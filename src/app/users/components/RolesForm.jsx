import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addRolAsync, UpdateRolAsync } from "@/features/usuarios/UsersThunks";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const RolesForm = ({ setAddRoleDialog, data = undefined }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    if (data == undefined) {
      const resp = await dispatch(addRolAsync(formData));
      if (resp == 200) {
        setAddRoleDialog(false);
        toast({
          title: `El rol "${formData.name}" fué agregado.`,
        });
      }
      if (resp == 400) {
        toast({
          variant: "destructive",
          title: `El rol "${formData.name}" no se pudo agregar debido a que estás ingresando algún dato erróneo.`,
        });
      }
    } else {
      const resp = await dispatch(UpdateRolAsync(formData));
      if (resp == 200) {
        setAddRoleDialog(false);
        toast({
          title: `El rol "${formData.name}" fué editado.`,
        });
      }
      if (resp == 400) {
        toast({
          variant: "destructive",
          title: `El rol "${formData.name}" no se pudo agregar debido a que estás ingresando algún dato erróneo.`,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form mb-7">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="ejemplo: analista de nomina"
              errors={errors.name ? "true" : "false"}
              {...register("name", {
                required: { value: true, message: "Nombre es requerido" },
                maxLength: {
                  value: 20,
                  message: "El máximo 20 caracteres",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="name">Código</Label>
            <Input
              id="code"
              placeholder="Ejempo: ANANOM"
              errors={errors.code ? "true" : "false"}
              {...register("code", {
                required: { value: true, message: "Código es requerido" },
                maxLength: {
                  value: 20,
                  message: "El máximo 20 caracteres",
                },
              })}
            />
            {errors.code && (
              <span className="text-red-500 text-sm">
                {errors.code.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Descripción corta sobre el Rol"
            className={errors.description ? "mt-2 border-red-500" : "mt-2"}
            {...register("description", {
              maxLength: {
                value: 50,
                message: "El máximo de caracteres es de 50",
              },
            })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>

      <DialogFooter>
        <div className="grid grid-cols-2 w-full gap-4">
          <Button
            className="w-full bg-muted hover:bg-muted/80  uppercase"
            onClick={() => setAddRoleDialog(false)}
            type="button"
          >
            Cancelar
          </Button>
          <Button
            className="uppercase"
            type="submit"
          >
            {data == undefined ? "Agregar nuevo rol" : "Editar rol"}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
};
