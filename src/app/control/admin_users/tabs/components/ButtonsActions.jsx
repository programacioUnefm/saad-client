import { Button } from "@/components/ui/button";
import { permissionCheck } from "@/features/PermissionCheck";
import { Pencil, Terminal, Trash } from "lucide-react";
import { useSelector } from "react-redux";

export const ButtonsActions = ({ setAction, arrayItem, tabState }) => {
  // permissionCheck
  const { permissions, roleList } = useSelector((state) => state.auth);

  return (
    <>
      <Button
        className="w-full"
        disabled={
          tabState == "users"
            ? !permissionCheck(["CONTROL_USUARIOS", "USUARIOS_EDITAR"],permissions, roleList)
            : !permissionCheck(["CONTROL_ROLES", "ROLES_EDITAR"], permissions, roleList)
        }
        onClick={() =>
          setAction({ dialog: true, action: "edit", arrayItem: arrayItem })
        }
      >
        <span className="hidden xl:block uppercase text-[10px]">Editar</span>
        <span
          className="block xl:hidden"
          style={{ fontSize: "13px!important" }}
        >
          <Pencil size={"15px"} />
        </span>
      </Button>
      {tabState == "users" || tabState == "roles" ? (
        <Button
          className="w-full"
          // disabled={
          //   tabState == "users"
          //     ? !permissionCheck(["CONTROL_USUARIOS", "USUARIOS_ASIGNAR_ROLES"],permissions)
          //     : !permissionCheck(["CONTROL_ROLES", "ROLES_ASIGNAR_PERMISOS"],permissions)
          // }
          onClick={() =>
            setAction({
              dialog: true,
              action: "assign",
              arrayItem: arrayItem,
            })
          }
        >
          <span className="hidden xl:block uppercase text-[10px]">
            {tabState == "users" ? "roles" : "Permisos"}
          </span>
          <span className="block xl:hidden">
            <Terminal size={"15px"} />
          </span>
        </Button>
      ) : (
        ""
      )}
      <Button
        className="dark:bg-destructive/80 dark:hover:bg-destructive hover:bg-destructive bg-destructive/80 w-full text-white"
        disabled={
          tabState == "users"
            ? !permissionCheck(["CONTROL_USUARIOS", "USUARIOS_ELIMINAR"],permissions, roleList)
            : !permissionCheck(["CONTROL_ROLES", "ROLES_ELIMINAR"], permissions, roleList)
        }
        onClick={() =>
          setAction({ dialog: true, action: "delete", arrayItem: arrayItem })
        }
      >
        <span className="hidden xl:block uppercase text-[10px]">Eliminar</span>
        <span className="block xl:hidden">
          <Trash size={"15px"} />
        </span>
      </Button>
    </>
  );
};
