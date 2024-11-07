import React, { useEffect, useMemo, useState } from "react";
import { AppLayout } from "../../layouts/appLayout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPermissionsList,
  GetRolesList,
  GetUsersList,
} from "@/features/control/usuarios/UsersThunks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchAndFilters } from "@/components/search/SearchAndFilters";
import { UsersTabs } from "./tabs/UsersTabs";
import { AddUser } from "./components/AddUser";
import { RolesTab } from "./tabs/RolesTab";
import { AddRoles } from "./components/AddRoles";
import { PermissionsTab } from "./tabs/PermissionsTab";
import { tabStateChange } from "@/features/control/usuarios/UsersSlice";
import { filterUrlChange } from "@/features/ui/UiSlice";
import { permissionCheck } from "@/features/PermissionCheck";
import { NoTabSelected } from "./tabs/NoTabSelected";

export const UsersListPage = () => {
  const dispatch = useDispatch();
  const { users, roles, permissions, tabState:defualtTab } = useSelector((state) => state.usersList);
  useEffect(() => {
    permissionCheck(["USUARIOS_LISTAR"], permissionList, roleList) && dispatch(GetUsersList());
    permissionCheck(["ROLES_LISTAR"], permissionList, roleList) && dispatch(GetRolesList());
    permissionCheck(["PERMISOS_LISTAR"], permissionList, roleList) && dispatch(GetPermissionsList());
    setTabState(defualtTab);
  }, []);
  const { permissions: permissionList, roleList } = useSelector((state) => state.auth);

  const { filters } = useSelector((state) => state.ui);
  
  const [tabState, setTabState] = useState("");

  const [addUserDialog, setaddUserDialog] = useState(false);
  const [addRoleDialog, setAddRoleDialog] = useState(false);
  const tabHandle = (value) => {
    setTabState(value);
    dispatch(tabStateChange(value));
    dispatch(filterUrlChange(`admin/${value}/search`));
  };

  
  return (
    <AppLayout
      title={"Funcionalidad de usuarios"}
      pagination={true}
      arrayPagination={
        filters.status
          ? filters.result.data
          : tabState == "users"
          ? users
          : tabState == "roles"
          ? roles
          : null
      }
    >

      
      <Tabs value={tabState} onValueChange={(value) => tabHandle(value)}>
        <div className="grid grid-cols-2">
          <div>
            <TabsList className="bg-slate-200 dark:bg-accent/50">
              {permissionCheck(["CONTROL_USUARIOS"], permissionList, roleList) && (
                <TabsTrigger className="uppercase" value="users">
                  Usuarios
                </TabsTrigger>
              )}
              {permissionCheck(["CONTROL_ROLES"], permissionList, roleList) && (
                <TabsTrigger className="uppercase" value="roles">
                  Roles
                </TabsTrigger>
              )}
              {permissionCheck(["CONTROL_PERMISOS"], permissionList, roleList) && (
                <TabsTrigger className="uppercase" value="permissions">
                  Permisos
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          <div className="flex justify-end">
            {tabState == "users" && (
              <AddUser
                addUserDialog={addUserDialog}
                setaddUserDialog={setaddUserDialog}
              />
            )}
            {tabState == "roles" && (
              <AddRoles
                addRoleDialog={addRoleDialog}
                setAddRoleDialog={setAddRoleDialog}
              />
            )}
          </div>
        </div>
        <TabsContent value="users">
          <div className="sticky top-0 bg-slate-100 dark:bg-background z-10	px-1">
            {/* <SearchAndFilters
              route={"admin/users/search/"}
              placeholder={"usuarios"}
            /> */}
          </div>
          <UsersTabs users={users} tabState={tabState} />
        </TabsContent>
        <TabsContent value="roles">
          {/* <div className="sticky top-0 bg-slate-100 dark:bg-background z-10	px-1">
            <SearchAndFilters
              route={"admin/roles/search/"}
              placeholder={"roles"}
            />
          </div> */}
          <RolesTab roles={roles} tabState={tabState} />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionsTab permissions={permissions} tabState={tabState} />
        </TabsContent>
        <TabsContent value="">
            <NoTabSelected />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};
