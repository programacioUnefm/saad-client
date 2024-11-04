import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { permissionCheck } from "@/features/PermissionCheck";
import {
  addPermissionAsync,
  editPermission,
} from "@/features/control/usuarios/UsersThunks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export const AddPermisionCard = ({ parent, setparent }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const [fatherPermission, setfatherPermission] = useState(false);
  const { permissions, roleList } = useSelector((state) => state.auth);
  useEffect(() => {
    reset();
    if (parent && parent.add) {
      setValue("parent_id", parent.data.id);
      setValue("code", `${parent.data.code}_`);
      setfatherPermission(false);
    }
    if (parent && !parent.add) {
      setValue("id", parent.data.id);
      setValue("parent_id", parent.data.parent_id);
      setValue("code", parent.data.code);
      setValue("name", parent.data.name);
      setValue("description", parent.data.description);
      setfatherPermission(false);
    }
    if (fatherPermission) {
      setValue("parent_id", "");
      setValue("code", "");
      setValue("name", "");
      setValue("description", "");
    }
  }, [parent]);

  const onAdd = async (data) => {
    const resp = await dispatch(addPermissionAsync(data));
    if (resp == 200) {
      toast({
        title: `El permiso "${data.name}" fué agregado.`,
      });
      reset();
      setparent(null);
    }
  };

  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    if (parent != null) {
      if (parent.add) {
        onAdd(formData);
      } else {
        const resp = await dispatch(editPermission(formData));
        if (resp == 200) {
          toast({
            title: `El permiso "${formData.name}" fué editado.`,
          });
          reset();
          setparent(null);
        }
      }
    } else {
      onAdd(formData);
    }
  };
  return (
    <div className="flex justify-center items-center">
      {parent != null || fatherPermission ? (
        <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
          <Card className="bg-white dark:bg-accent/20">
            <CardHeader className="uppercase text-center">
              <CardTitle className="text-[18px]">
                {parent ? (
                  !parent.add ? (
                    <div>
                      {parent.data.parent_id == null ? (
                        `Editar ${parent.data.name}`
                      ) : (
                        <div className="flex flex-col">
                          <span>Editar {parent.data.name}</span>
                          <span className="text-sm font-normal">
                            padre: {parent.data.parent.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span>Agregar hijo {parent.data.name}</span>
                      <span className="text-sm font-normal">
                        {parent.data.parent && (
                          <span>padre: {parent.data.parent.name}</span>
                        )}
                      </span>
                    </div>
                  )
                ) : (
                  <span>Agregar permiso padre</span>
                )}
           
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name"> Nombre </Label>
                  <Input
                    id="name"
                    placeholder="Nombre del permiso"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "El campo es requerido.",
                      },
                      minLength: { value: 3, message: "Minimo 3 caracteres." },
                      maxLength: {
                        value: 20,
                        message: "maximo 80 caracteres.",
                      },
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="code"> Código </Label>
                  <Input
                    id="code"
                    placeholder="Ejmplo: CODE_123"
                    {...register("code", {
                      required: {
                        value: true,
                        message: "El campo es requerido.",
                      },
                      minLength: { value: 3, message: "Minimo 3 caracteres." },
                      maxLength: {
                        value: 60,
                        message: "maximo 60 caracteres.",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="text-left mt-2">
                <Label htmlFor="description">Descripción corta </Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    maxLength: { value: 80, message: "maximo 80 caracteres." },
                  })}
                  placeholder="Descripción corta sobre el permiso"
                  className="mt-2"
                />
              </div>
              {/* <div className="flex items-center space-x-2 mt-4">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">CREAR CRUD</Label>
              </div> */}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                type="button"
                className="w-full"
                size="md"
                onClick={() => {
                  setfatherPermission(false);
                  setparent(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="md"
                className="w-full"
              >
                {parent
                  ? !parent.add
                    ? "Editar permiso"
                    : "Agregar hijo"
                  : "permiso padre"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center text-center">
          <Card className="bg-white dark:bg-muted/20">
            <CardHeader>
              <CardTitle className="text-xl uppercase font-bold text-muted-foreground/90">
                Selecciona una acción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Crea un nuevo permiso, tambien puedes crear un permiso como hijo
                de otro permiso, elminar editar o agregar permisos dando clic en
                el nombre del permiso y seleccionando la opción correspondiente
                o crea un permiso padre en el botón que está justo debajo
              </p>
              <Button
                variant="outline"
                className="mt-4"
                disabled={!permissionCheck(["CONTROL_PERMISOS", "PERMISOS_AGREGAR"],permissions, roleList)}
                size="lg"
                onClick={() => {
                  setfatherPermission(true);
                }}
              >
                {
                  permissionCheck(["CONTROL_PERMISOS", "PERMISOS_AGREGAR"],permissions, roleList)? "Crear Permiso": "sin acceso"
                }
                
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
