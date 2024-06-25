import React, { useEffect, useState } from "react";
import { AppLayout } from "../layouts/appLayout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPermissionsList,
  GetRolesList,
  GetUsersList,
} from "@/features/usuarios/UsersThunks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderUser } from "./components/HeaderUser";
import { UsersTabs } from "./components/tabs/UsersTabs";
import { AddUser } from "./components/AddUser";
import { RolesTab } from "./components/tabs/RolesTab";
import { AddRoles } from "./components/AddRoles";
import { PermissionsTab } from "./components/tabs/PermissionsTab";
import { AddPermissions } from "./components/AddPermissions";
import { tabStateChange } from "@/features/usuarios/UsersSlice";

export const UsersListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsersList());
    dispatch(GetRolesList());
    dispatch(GetPermissionsList());
  }, []);

  const { users, roles, permissions } = useSelector((state) => state.usersList);
  const [tabState, setTabState] = useState("users");
  const [addUserDialog, setaddUserDialog] = useState(false);
  const [addRoleDialog, setAddRoleDialog] = useState(false);
  const [addPermissionsDialog, setPermissionsDialog] = useState(false);
  const tabHandle = (value) => {
    setTabState(value);
    dispatch(tabStateChange(value));
  };
  

  return (
    <AppLayout
      title={"Funcionalidad de usuarios"}
      pagination={true}
      arrayPagination={
        tabState == "users" ? users : tabState == "role" ? roles : permissions
      }
    >
      <Tabs defaultValue={tabState} onValueChange={(value) => tabHandle(value)}>
        <div className="grid grid-cols-2">
          <div>
            <TabsList className="bg-slate-200 dark:bg-accent/50">
              <TabsTrigger className="uppercase" value="users">
                Usuarios
              </TabsTrigger>
              <TabsTrigger className="uppercase" value="role">
                Roles
              </TabsTrigger>
              <TabsTrigger className="uppercase" value="permissions">
                Permisos
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex justify-end">
            {tabState == "users" && (
              <AddUser
                addUserDialog={addUserDialog}
                setaddUserDialog={setaddUserDialog}
              />
            )}
            {tabState == "role" && (
              <AddRoles
                addRoleDialog={addRoleDialog}
                setAddRoleDialog={setAddRoleDialog}
              />
            )}
            {tabState == "permissions" && (
              <AddPermissions
                addPermissionsDialog={addPermissionsDialog}
                setPermissionsDialog={setPermissionsDialog}
              />
            )}
          </div>
        </div>
        <TabsContent value="users">
          <div className="sticky top-0 bg-slate-100 dark:bg-background z-10	px-1">
            <HeaderUser route={"users"} placeholder={"usuarios"} />
          </div>
          <UsersTabs users={users} tabState={tabState} />
        </TabsContent>
        <TabsContent value="role">
          <div className="sticky top-0 bg-slate-100 dark:bg-background z-10	px-1">
            <HeaderUser route={"roles"} placeholder={"roles"} />
          </div>
          <RolesTab roles={roles} tabState={tabState} />
        </TabsContent>
        <TabsContent value="permissions">
          <div className="sticky top-0 bg-slate-100 dark:bg-background z-10	px-1">
            <HeaderUser
              route={"permissions"}
              placeholder={"permisos"}
              tabState={tabState}
            />
          </div>
          <PermissionsTab permissions={permissions} tabState={tabState} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};
