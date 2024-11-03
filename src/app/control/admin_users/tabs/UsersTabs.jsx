import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoleAssign } from "../components/RoleAssign";
import { EditUser } from "../forms/EditUser";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch"

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

export const UsersTabs = ({ users, tabState }) => {
  // const { layout, filters } = useSelector((state) => state.ui);
  const [action, setAction] = useState({
    dialog: false,
    action: "",
    arrayItem: {},
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
    const data = {"id": item.id, "activo": !item.activo};
    const resp = await dispatch(editUserAsync(data));
    if(resp == 200){
      toastAction(`El usuario "${item.username}" ha sido ${item.activo? "inhabilitado, ahora no podrá iniciar sesión": "activado, ahora podrá iniciar sesión"}.`);
    }
  }

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const resp = auth.roles.some(obj => obj.code === "ADMIN");
    console.log(resp)
      
  }, [])
  
  

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
      header: "CÉDULA",
      accessorKey: "document_id",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center font-bold">{info.getValue()}</div>
      ),
    },
    {
      header: "USUARIO",
      accessorKey: "username",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "NOMBRES",
      accessorKey: "name",
      enableSorting: false,
      classname: "text-center w-5",
      cell: (info) => <div className="">{info.getValue()}</div>,
    },
    {
      header: "APELLIDOS",
      enableSorting: false,
      accessorKey: "last_name",
      classname: "text-center w-5",
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
      accessorKey: "activo",
      classname: "text-center",
      cell: (info) => <div className="text-center"><Switch checked={info.getValue()}  onCheckedChange={(e) => statusChange(e, info.row.original)} /></div>,
    },

    {
      header: "ROLES",
      enableSorting: false,
      accessorKey: "roles",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center">
          {info.getValue().length > 0 ? (
            info.getValue().map((rol) => (
              <Badge
                className="uppercase dark:bg-white dark:text-black"
                key={Math.random()}
              >
                {rol.name}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary" className="uppercase">
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
      accessorKey: "acciones",
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
                  onClick={() => {
                    setAction({
                      dialog: true,
                      action: "assign",
                      arrayItem: row.original,
                    });
                  }}
                >
                  Cambiar roles
                </DropdownMenuItem>
                <DropdownMenuItem
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
                disabled={true}
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
      name: true,
      username: true,
      last_name: true,
      document_id: true,
      email: true,
      acciones: true,
    },
    filters: [],
    sorting: [],
    columnFilters: [],
    view: 10,
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  });

  return (
    <>
      <br />
      <DataTable
        columns={columns}
        data={users.data}
        filtersTable={filtersTable}
        setFiltersTable={setFiltersTable}
      />
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
      ) : action.action == "edit" ? (
        <EditUser
          open={action.dialog}
          setAction={setAction}
          user={action.arrayItem}
        />
      ) : (
        ""
      )}
    </>
  );
};
