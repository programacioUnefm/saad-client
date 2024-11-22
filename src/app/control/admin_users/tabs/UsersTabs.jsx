import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoleAssign } from "../components/RoleAssign";
import { EditUser } from "../forms/EditUser";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import {
  deleteUser,
  editUserAsync,
  paginateUsers,
  userRoleAssign,
} from "@/features/control/usuarios/UsersThunks";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmDelete } from "../forms/ConfirmDelete";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { permissionCheck } from "@/features/PermissionCheck";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const UsersTabs = ({ users, tabState }) => {
  const [action, setAction] = useState({
    dialog: false,
    action: "",
    arrayItem: {},
  });
  const [isAdmin, setisAdmin] = useState(false);
  const [usersPermissions, setUsersPermissions] = useState({
    add: false,
    edit: false,
    assing: false,
    delete: false,
  });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const toastAction = (description = "") => {
    toast({
      title: "Operación realizada",
      description: description,
    });
  };

  const roleAssign = async (e) => {
    const { user, rolActive } = e;
    const newState = { userId: user.id, roles: { roles: rolActive } };
    const resp = await dispatch(userRoleAssign(newState));
    if (resp == 200) {
      toastAction(`El usuario "${user.name}" tiene nuevos roles`);
    }
  };

  const deleUser = async (e) => {
    const resp = await dispatch(deleteUser(e.id));
    if (resp == 200) {
      toastAction("El usuario fué eliminado satisfactoriamente.");
    }
  };

  const statusChange = async (e, item) => {
    const data = { id: item.id, status: !item.status };
    const resp = await dispatch(editUserAsync(data));
    if (resp == 200) {
      toastAction(
        `El usuario "${item.username}" ha sido ${
          item.status
            ? "inhabilitado, ahora no podrá iniciar sesión"
            : "activado, ahora podrá iniciar sesión"
        }.`
      );
    }
  };

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const resp = auth.roles.some((obj) => obj.code === "ADMIN");
    resp && setisAdmin(true);
    let permissions = {};
    auth.roles.forEach((element) => {
      permissions = {
        add: element.permissions.includes("USUARIOS_AGREGAR"),
        edit: element.permissions.includes("USUARIOS_EDITAR"),
        assing: false,
        delete: element.permissions.includes("USUARIOS_ELIMINAR"),
      };
    });
    // console.log(permissions)
  }, []);

  const checkAsign = (e) => {
    if (
      permissionCheck(
        ["CONTROL_USUARIOS", "ROLES_LISTAR"],
        auth.permissions,
        auth.roleList
      )
    ) {
      setAction({
        dialog: true,
        action: "assign",
        arrayItem: e,
      });
    } else {
      toast({
        title: "Error de privilegios",
        description:
          "tu usuario puede reasignar roles, sin embargo no posee permisos para ver la lista de roles, contacta a un administrador para que lo resuelva.",
      });
    }
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      classname: "text-center w-[100px]",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      meta: {
        filterVariant: "range",
      },
    },
    {
      id: "cédula",
      header: "CÉDULA",
      accessorKey: "document_id",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center font-bold">{info.getValue()}</div>
      ),
    },
    {
      id: "nombre usuario",
      header: "USUARIO",
      accessorKey: "username",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      id: "nombres",
      header: "NOMBRES",
      accessorKey: "name",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => <div className="">{info.getValue()}</div>,
    },
    {
      id: "apellidos",
      header: "APELLIDOS",
      enableSorting: false,
      accessorKey: "last_name",
      classname: "text-center",
      cell: (info) => <div className="">{info.getValue()}</div>,
    },

    {
      header: "EMAIL",
      accessorKey: "email",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },

    {
      header: "ESTATUS",
      accessorKey: "status",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center">
          <Switch
            checked={info.getValue()}
            onCheckedChange={(e) => statusChange(e, info.row.original)}
          />
        </div>
      ),
    },

    {
      header: "ROLES",
      enableSorting: false,
      accessorKey: "roles",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center flex gap-2">
          {info.getValue().length > 0 ? (
            info.getValue().map((rol, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="uppercase dark:bg-accent  line-clamp-1" >
                      {rol.name}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{rol.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))
          ) : (
            <Badge variant="secondary" className="uppercase bg-slate-500">
              Sin Rol
            </Badge>
          )}
        </div>
      ),
    },

    {
      id: "acciones",
      header: "ACCIONES",
      enableSorting: false,
      classname: "text-center",
      enableFiltering: false,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>ACCIONES</DropdownMenuLabel>
                <DropdownMenuItem
                  disabled={
                    !permissionCheck(
                      ["CONTROL_USUARIOS", "USUARIO_ROLES"],
                      auth.permissions,
                      auth.roleList
                    )
                  }
                  onClick={() => checkAsign(row.original)}
                >
                  Cambiar roles
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={
                    !permissionCheck(
                      ["CONTROL_USUARIOS", "USUARIOS_EDITAR"],
                      auth.permissions,
                      auth.roleList
                    )
                  }
                  onClick={() => {
                    setAction({
                      dialog: true,
                      action: "edit",
                      arrayItem: row.original,
                    });
                  }}
                >
                  Editar usuario
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={
                    !permissionCheck(
                      ["CONTROL_USUARIOS", "USUARIOS_ELIMINAR"],
                      auth.permissions,
                      auth.roleList
                    )
                  }
                  onClick={() => {
                    setAction({
                      dialog: true,
                      action: "delete",
                      arrayItem: row.original,
                    });
                  }}
                >
                  Eliminar usuario
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const [filtersTable, setFiltersTable] = useState({
    columnVisibility: {
      id: true,
      cédula: true,
      "nombre usuario": true,
      nombres: true,
      apellidos: true,
      email: true,
      activo: true,
      roles: true,
      acciones: true,
    },
    filters: "",
    sorting: [],
    columnFilters: [],
    view: 20,
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
  });

  return (
    <>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={users.data != undefined ? users.data : []}
          filtersTable={filtersTable}
          setFiltersTable={setFiltersTable}
        />
      </div>
      {action.action == "delete" ? (
        <ConfirmDelete
          open={action.dialog}
          setAction={setAction}
          action={action}
          dialogAction={deleUser}
          description="quizás este usuario haga un trabajo único dentro del sistema, ¿estás completamente segur@ de eliminarlo?"
        />
      ) : action.action == "assign" ? (
        <RoleAssign
          open={action.dialog}
          setAction={setAction}
          user={action.arrayItem}
          dialogAction={roleAssign}
        />
      ) : (
        action.action == "edit" && (
          <EditUser
            open={action.dialog}
            setAction={setAction}
            user={action.arrayItem}
          />
        )
      )}
    </>
  );
};
