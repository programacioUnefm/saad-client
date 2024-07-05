import React, { useState } from "react";
import { GridUsers } from "../layouts/GridUsers";
import { useDispatch, useSelector } from "react-redux";
import { ListUsers } from "../layouts/ListUsers";
import { Table, TableBody } from "@/components/ui/table";

import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";

import { RoleAssign } from "../components/RoleAssign";
import { EditUser } from "../components/EditUser";
import { deleteUser, userRoleAssign } from "@/features/usuarios/UsersThunks";
import { useToast } from "@/components/ui/use-toast";
import { TableHeaderUsers } from "../layouts/TableHeaderUsers";
import { ConfirmDelete } from "../components/ConfirmDelete";

export const UsersTabs = ({ users, tabState }) => {
  const { layout, filters } = useSelector((state) => state.ui);
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
      {users.data != undefined ? (
        layout == "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {users.data != undefined &&
              !filters.status &&
              users.data.map((user) => (
                <GridUsers
                  user={user}
                  key={user.id}
                  setAction={setAction}
                  tabState={tabState}
                />
              ))}
            {filters.status &&
              filters.result.data.data.map((search) => (
                <GridUsers
                  user={search}
                  key={search.id}
                  setAction={setAction}
                  tabState={tabState}
                />
              ))}
          </div>
        ) : (
          <div className="w-full">
            <Table className="bg-background p-2 rounded-sm">
              <TableHeaderUsers />
              <TableBody>
                {users.data != undefined &&
                  !filters.status &&
                  users.data.map((user) => (
                    <ListUsers
                      user={user}
                      key={user.id}
                      setAction={setAction}
                      tabState={tabState}
                    />
                  ))}
                {filters.status &&
                  filters.result.data.data.map((search) => (
                    <ListUsers
                      user={search}
                      key={search.id}
                      setAction={setAction}
                      tabState={tabState}
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
