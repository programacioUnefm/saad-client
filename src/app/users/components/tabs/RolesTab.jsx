import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridRoles } from "./components/layouts/GridRoles";
import { ConfirmDelete } from "../ConfirmDelete";
import { RoleAssign } from "../RoleAssign";
import { EditUser } from "../EditUser";
import { deleteRol } from "@/features/usuarios/UsersThunks";
import { AddRoles } from "../AddRoles";
import { EditRolesDialog } from "./components/EditRolesDialog";
import { PermissionsAssign } from "./components/PermissionsAssign";

export const RolesTab = ({ roles, tabState }) => {
  const { layout } = useSelector((state) => state.ui);
  const [action, setAction] = useState({
    dialog: false,
    action: "",
    arrayItem: {},
  });
  const [addRoleDialog, setAddRoleDialog] = useState(true);
  const dispatch = useDispatch();
  const { toast } = useToast();
  useEffect(() => {
    if(action.action == "edit"){
      setAddRoleDialog(true)
    }
  }, [action])
  
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
      {layout == "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {roles.map((rol) => (
            <GridRoles key={rol.id} rol={rol} setAction={setAction} tabState={tabState}/>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Table>
            {/* <TableHeaderUsers /> */}
            <TableBody>
              {/* {users.map((user) => (
                <ListUsers user={user} key={user.id} setAction={setAction} />
              ))} */}
            </TableBody>
          </Table>
        </div>
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
        <PermissionsAssign />
      ) : action.action == "edit" ? (
        <>
          <EditRolesDialog
            addRoleDialog={addRoleDialog}
            setAddRoleDialog={setAddRoleDialog}
            data={action.arrayItem}
          />
        </>
      ) : null}
    </>
  );
};
