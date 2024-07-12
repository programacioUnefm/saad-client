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

export const RolesTab = ({ roles, tabState }) => {
  const { layout, filters } = useSelector((state) => state.ui);
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
  const itemsPerView = roles.total - roles.current_page * roles.per_page;
  const paginationRoles = () => {
    dispatch(paginateRole(roles.next_page_url));
  };

  return (
    <>
      {roles.data != undefined ? (
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
      </div>

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
