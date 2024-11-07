import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridRoles } from "../layouts/GridRoles";

import {
  deleteRol,
  paginateRole,
} from "@/features/control/usuarios/UsersThunks";
import { EditRolesDialog } from "./components/EditRolesDialog";
import { PermissionsAssign } from "./components/PermissionsAssign";
import { TableHeaderRoles } from "../layouts/TableHeaderRoles";
import { ListRoles } from "../layouts/ListRoles";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";
import { ConfirmDelete } from "../forms/ConfirmDelete";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable/DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export const RolesTab = ({ roles, tabState }) => {
  const [action, setAction] = useState({
    dialog: false,
    action: "",
    arrayItem: {},
  });
  const [addRoleDialog, setAddRoleDialog] = useState(true);
  const [addPermissions, setaddPermissions] = useState(true);
  const dispatch = useDispatch();
  const { toast } = useToast();
  useEffect(() => {
    if (action.action == "edit") {
      setAddRoleDialog(true);
    }
    if (action.action == "assign") {
      setaddPermissions(true);
    }
  }, [action]);

  const toastAction = (description = "") => {
    toast({
      title: "Operación realizada",
      description: description,
    });
  };

  const deleteRole = (e) => {
    dispatch(deleteRol(e.id));
    toastAction(`el rol "${e.name}" fué elminado de la base de datos.`);
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
      id:"CÓDIGO",
      header: "CÓDIGO",
      accessorKey: "code",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center font-bold">
          <Badge >{info.getValue()}</Badge>
        </div>
      ),
    },
    {
      id:"ROL",
      header: "ROL",
      accessorKey: "name",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      id:"description",
      header: "DESCRIPCIÓN",
      accessorKey: "description",
      enableSorting: false,
      classname: "w-full",
      cell: (info) => <div className="">{info.getValue()}</div>,
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
                  // disabled={
                  //   !permissionCheck(
                  //     ["CONTROL_USUARIOS", "USUARIO_ROLES"],
                  //     auth.permissions,
                  //     auth.roleList
                  //   )
                  // }
                  // onClick={() => checkAsign(row.original)}
                >
                  Cambiar roles
                </DropdownMenuItem>
                <DropdownMenuItem
                  // disabled={
                  //   !permissionCheck(
                  //     ["CONTROL_USUARIOS", "USUARIOS_EDITAR"],
                  //     auth.permissions,
                  //     auth.roleList
                  //   )
                  // }
                  // onClick={() => {
                  //   setAction({
                  //     dialog: true,
                  //     action: "edit",
                  //     arrayItem: row.original,
                  //   });
                  // }}
                >
                  Editar usuario
                </DropdownMenuItem>
                <DropdownMenuItem
                  // disabled={
                  //   !permissionCheck(
                  //     ["CONTROL_USUARIOS", "USUARIOS_ELIMINAR"],
                  //     auth.permissions,
                  //     auth.roleList
                  //   )
                  // }
                  // onClick={() => {
                  //   setAction({
                  //     dialog: true,
                  //     action: "delete",
                  //     arrayItem: row.original,
                  //   });
                  // }}
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
      "id": true,
      "CÓDIGO": true,
      "ROL": true,
      "description": true,
      "acciones": true,
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
    <DataTable 
      columns={columns}
      data={roles.data != undefined ? roles.data : []}
      filtersTable={filtersTable}
      setFiltersTable={setFiltersTable}
    />
      {/* {roles.data != undefined ? (
        layout == "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filters.status
              ? filters.result.data.data.map((search) => (
                  <GridRoles
                    key={search.id}
                    rol={search}
                    setAction={setAction}
                    tabState={tabState}
                  />
                ))
              : roles.data.map((rol) => (
                  <GridRoles
                    key={rol.id}
                    rol={rol}
                    setAction={setAction}
                    tabState={tabState}
                  />
                ))}
          </div>
        ) : (
          <div className="w-full">
            <Table className="dark:bg-accent/20 bg-white rounded-md">
              <TableHeaderRoles />
              <TableBody>
                {filters.status
                  ? filters.result.data.data.map((search) => (
                      <ListRoles
                        rol={search}
                        key={Math.random()}
                        tabState={tabState}
                        setAction={setAction}
                      />
                    ))
                  : roles.data.map((rol) => (
                      <ListRoles
                        rol={rol}
                        key={Math.random()}
                        tabState={tabState}
                        setAction={setAction}
                      />
                    ))}
              </TableBody>
            </Table>
          </div>
        )
      ) : layout == "grid" ? (
        <SkeletonGrid />
      ) : (
        <SkeletonList />
      )}
      <div className="flex justify-center mt-4">
        {!filters.status && itemsPerView > 0 && (
          <Button variant="outline" onClick={paginationRoles}>
            Ver más Roles + {itemsPerView}
          </Button>
        )}
      </div> */}

      {action.action == "delete" ? (
        <ConfirmDelete
          open={action.dialog}
          setAction={setAction}
          action={action}
          dialogAction={deleteRole}
          description={
            "Estás a punto de elminar un rol, quizás varios usuarios posean este rol asi que esta acción podria afectarles"
          }
        />
      ) : action.action == "assign" ? (
        <PermissionsAssign
          data={action.arrayItem}
          addPermissions={addPermissions}
          setaddPermissions={setaddPermissions}
        />
      ) : action.action == "edit" ? (
        <EditRolesDialog
          addRoleDialog={addRoleDialog}
          setAddRoleDialog={setAddRoleDialog}
          data={action.arrayItem}
        />
      ) : null}
    </>
  );
};
