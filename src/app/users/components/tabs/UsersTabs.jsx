import React, { useState } from "react";
import { GridUsers } from "./components/layouts/GridUsers";
import { ConfirmDelete } from "../ConfirmDelete";
import { RoleAssign } from "../RoleAssign";
import { EditUser } from "../EditUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userRoleAssign } from "@/features/usuarios/UsersThunks";
import { useToast } from "@/components/ui/use-toast";
import { ListUsers } from "./components/layouts/ListUsers";
import { Table, TableBody } from "@/components/ui/table";
import { TableHeaderUsers } from "./components/TableHeaderUsers";

export const UsersTabs = ({ users, tabState }) => {
  const { layout } = useSelector((state) => state.ui);
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
          {users.data != undefined
            ? users.data.map((user) => (
                <GridUsers
                  user={user}
                  key={user.id}
                  setAction={setAction}
                  tabState={tabState}
                />
              ))
            : "Cargando grid de usuarios"}
        </div>
      ) : (
        <div className="w-full">
          {users.data != undefined ? (
            <Table>
              <TableHeaderUsers />
              <TableBody>
                {users.data.map((user) => (
                  <ListUsers
                    user={user}
                    key={user.id}
                    setAction={setAction}
                    tabState={tabState}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            "Cargando datos"
          )}
        </div>
      )}

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
          dialogAction={editUser}
        />
      ) : (
        ""
      )}
    </>
  );
};
