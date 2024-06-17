import React, { useState } from "react";
import { GridUsers } from "./components/GridUsers";
import { ConfirmDelete } from "../ConfirmDelete";
import { RoleAssign } from "../RoleAssign";
import { EditUser } from "../EditUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userRoleAssign } from "@/features/usuarios/UsersThunks";
import { useToast } from "@/components/ui/use-toast";
import { ListUsers } from "./components/ListUsers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UsersTabs = ({ users }) => {
  const { layout } = useSelector((state) => state.login);
  const [action, setAction] = useState({ dialog: false, action: "", user: {} });
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
    const newState = { userId: user.id, roles: { role_id: rolActive } };
    const resp = await dispatch(userRoleAssign(newState));
    if (resp == 200) {
      toastAction(`El usuario "${user.name}" tiene nuevos roles`);
    }
  };

  const editUser = (e) => {
    console.log(e);
  };

  const deleUser = async (e) => {
    const resp = await dispatch(deleteUser(e.id));
    if (resp == 200) {
      toastAction("El usuario fué eliminado satisfactoriamente.");
    }
  };
  
  return (
    <>
      {layout == "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => (
            <GridUsers user={user} key={user.id} setAction={setAction} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Cédula</TableHead>
                <TableHead className="hidden md:table-cell w-[100px]">Nombre</TableHead>
                <TableHead className="hidden md:table-cell w-[100px]">Apellido</TableHead>
                <TableHead className="hidden md:table-cell w-[100px]">Correo</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead className="text-right pr-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <ListUsers user={user} key={user.id} setAction={setAction} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {action.action == "delete" ? (
        <ConfirmDelete
          open={action.dialog}
          setAction={setAction}
          action={action}
          dialogAction={deleUser}
        />
      ) : action.action == "role" ? (
        <RoleAssign
          open={action.dialog}
          setAction={setAction}
          user={action.user}
          dialogAction={roleAssign}
        />
      ) : action.action == "edit" ? (
        <EditUser
          open={action.dialog}
          setAction={setAction}
          user={action.user}
          dialogAction={editUser}
        />
      ) : (
        ""
      )}
    </>
  );
};
