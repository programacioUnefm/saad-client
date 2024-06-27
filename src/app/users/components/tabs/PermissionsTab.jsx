import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridPermissions } from "../../layouts/GridPermissions";
import { TableHeaderPermissions } from "../../layouts/TableHeaderPermissions";
import { ListPermissions } from "../../layouts/ListPermissions";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
import { ConfirmDelete } from "../ConfirmDelete";
import { deletePermission } from "@/features/usuarios/UsersThunks";
import { EditPermissionsDIalog } from "./components/EditPermissionsDIalog";

export const PermissionsTab = ({ permissions, tabState }) => {
  const { layout } = useSelector((state) => state.ui);
  const [action, setAction] = useState({
    dialog: false,
    action: "",
    arrayItem: {},
  });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const detePermission = () => {
    dispatch(deletePermission(action.arrayItem.id));
    toast({
      title: "Operación realizada",
      variant: "destructive",
      description: `El permiso "${action.arrayItem.name}" fué eliminado de la base de datos.`,
    });
  };
  return (
    <>
      {permissions.data != undefined ? (
        layout == "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {permissions.data.map((permission) => (
              <GridPermissions
                key={permission.id}
                permission={permission}
                setAction={setAction}
                tabState={tabState}
              />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <Table className="bg-background p-2 rounded-sm">
              <TableHeaderPermissions />
              <TableBody>
                {permissions.data.map((permission) => (
                  <ListPermissions
                    key={Math.random()}
                    permission={permission}
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
          dialogAction={detePermission}
          description={
            "Estás a punto de elminar un permiso, quizás varios usuarios posean este permiso y está accion afectara a varios roles los cuales tengan ese permiso ¿estás totalmente seguro de realizar esta acción?"
          }
        />
      ) : action.action == "edit" ? (
        <EditPermissionsDIalog action={action} setAction={setAction} />
      ) : null}
    </>
  );
};
