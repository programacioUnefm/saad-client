import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight, Dot, Lock, Pencil, Plus, Trash } from "lucide-react";
import "./tooltip.css";
import { useDispatch, useSelector } from "react-redux";
import { deletePermission } from "@/features/control/usuarios/UsersThunks";
import { useToast } from "@/components/ui/use-toast";
import { Confirm } from "@/components/Confirm";
import { useState } from "react";
import { permissionCheck } from "@/features/PermissionCheck";
import { ParentReasign } from "../../forms/ParentReasign";

export const TooltipPermission = ({
  tooltip = "",
  message = "",
  data = {},
  permission = "",
  action,
}) => {
  const { permissions } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const [confirm, setconfirm] = useState(false);
  const onDelete = async (id) => {
    const resp = await dispatch(deletePermission(id));
    if (resp == 200) {
      action(null);
      toast({
        title: "Operación realizada",
        description: "El permiso ha sido eliminado",
      });
    }
  };

  const WithoutAuth = () => {
    return (
      <>
        {!permissionCheck(["PERMISOS_REASIGNAR"], permissions) &&
          !permissionCheck(["PERMISOS_ELIMINAR"], permissions) &&
          !permissionCheck(["PERMISOS_AGREGAR"], permissions) &&
          !permissionCheck(["PERMISOS_EDITAR"], permissions) && (
            <span className="text-sm">
              Actualmente solo tienes permisos para "ver lista de permisos"
            </span>
          )}
      </>
    );
  };

  return (
    <>
      {permission != "" ? (
        <div
          className="ml-4 mb-2 flex items-center uppercase cursor-pointer"
          onClick={() => action({ data: data, add: true })}
        >
          <ChevronRight className="w-4 ml-3" />
          {tooltip}
        </div>
      ) : (
        <Popover>
          <PopoverTrigger>
            <div className="tooltip text-left">
              <div className="ml-4 flex items-center uppercase xl:text-[13px]">
                {/* {!data.children &&
                  tooltip.toUpperCase() != "AGREGAR" &&
                  tooltip.toUpperCase() != "EDITAR" &&
                  tooltip.toUpperCase() != "ELIMINAR" && (
                    <Dot className="w-15" />
                  )} */}
                {!data.children && tooltip.toUpperCase() == "AGREGAR" && (
                  <Plus className="w-4 mr-1" />
                )}
                {!data.children && tooltip.toUpperCase() == "EDITAR" && (
                  <Pencil className="w-4 mr-1" />
                )}
                {!data.children && tooltip.toUpperCase() == "ELIMINAR" && (
                  <Trash className="w-4 mr-1" />
                )}
                {tooltip}
              </div>
              <span className="tooltiptext">
                {message != null
                  ? `${message} ${permission}`
                  : "Sin descripción"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="text-center">
            <div className="flex flex-col">
              <span className="uppercase text-[10px]">
                Acciones para <b>"{data.name}"</b>
              </span>
              <span className="uppercase text-[10px]">
                {data.parent && `Hijo de: ${data.parent.name}`}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              {permissionCheck(
                ["CONTROL_PERMISOS", "PERMISOS_AGREGAR"],
                permissions
              ) && (
                <span
                  className="truncate text-foreground/70 text-[10px] border-2 bg-muted-foreground/20 hover:bg-accent p-1 uppercase rounded-md cursor-pointer"
                  onClick={() => {
                    action({ data: data, add: true });
                  }}
                >
                  Agregar hijo
                </span>
              )}
              {permissionCheck(
                ["CONTROL_PERMISOS", "PERMISOS_EDITAR"],
                permissions
              ) && (
                <span
                  className="truncate  text-foreground/70 text-[10px] border-2 bg-muted-foreground/20 hover:bg-accent p-1 uppercase rounded-md cursor-pointer"
                  onClick={() => {
                    action({ data: data, add: false });
                  }}
                >
                  Editar permiso
                </span>
              )}
              {permissionCheck(
                ["CONTROL_PERMISOS", "PERMISOS_REASIGNAR"],
                permissions
              ) && <ParentReasign data={data} />}
              {permissionCheck(
                ["CONTROL_PERMISOS", "PERMISOS_ELIMINAR"],
                permissions
              ) && (
                <span
                  className="truncate text-white text-foreground/70 text-[10px]  hover:bg-destructive/80 p-1 uppercase rounded-md bg-destructive cursor-pointer"
                  onClick={() => {
                    setconfirm(true);
                  }}
                >
                  Eliminar permiso
                </span>
              )}
              <WithoutAuth />
            </div>
          </PopoverContent>
          <Confirm
            open={confirm}
            title="Estás a punto de eliminar algo importante"
            message="El permiso que estás eliminando quizás sea importante para el funcionamiento del sistema, recuerda que esta acción podrás ser vista por los desarrolladores del sistema."
            setOpen={setconfirm}
            action={() => onDelete(data.id)}
          />
        </Popover>
      )}
    </>
  );
};
