import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridRoles } from "../../layouts/GridRoles";
import { ConfirmDelete } from "../ConfirmDelete";
import { deleteRol } from "@/features/usuarios/UsersThunks";
import { EditRolesDialog } from "./components/EditRolesDialog";
import { PermissionsAssign } from "./components/PermissionsAcctions/PermissionsAssign";
import { TableHeaderRoles } from "../../layouts/TableHeaderRoles";
import { ListRoles } from "../../layouts/ListRoles";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";

export const RolesTab = ({ roles, tabState }) => {
  const { layout } = useSelector((state) => state.ui);
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

  return (
    <>
      {roles.data != undefined ? (
        layout == "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {roles.data.map((rol) => (
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
            <Table className="bg-background p-2 rounded-sm">
              <TableHeaderRoles />
              <TableBody>
                {roles.data.map((rol) => (
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
