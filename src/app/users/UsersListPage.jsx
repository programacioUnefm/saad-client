import React, { useEffect, useState } from "react";
import { AppLayout } from "../layouts/appLayout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { GetRolesList, GetUsersList } from "@/features/usuarios/UsersThunks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderUser } from "./components/HeaderUser";
import { Button } from "@/components/ui/button";
import { UsersTabs } from "./components/tabs/UsersTabs";
import { AddUser } from "./components/AddUser";

export const UsersListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsersList());
    dispatch(GetRolesList());
  }, []);

  
  
  const {users} = useSelector((state) => state.usersList);
  const [tabState, setTabState] = useState("users");
  const [addUserDialog, setaddUserDialog] = useState(false);
  const addUser = () => {};
  const tabHandle = (value) => {
    setTabState(value);
  };

  return (
    <AppLayout title={"Funcionalidad de usuarios"}>
      <Tabs defaultValue={tabState} onValueChange={(value) => tabHandle(value)}>
        <div className="grid grid-cols-2">
          <div>
            <TabsList>
              <TabsTrigger className="uppercase" value="users">
                Usuarios
              </TabsTrigger>
              <TabsTrigger className="uppercase" value="role">
                Roles
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
              <Button variant="outline">Agregar rol</Button>
            )}
          </div>
        </div>
        <TabsContent value="users">
          <div className="sticky top-0 bg-background z-50	px-1">
            <HeaderUser route={"users"} placeholder={"usuarios"} />
          </div>
          <UsersTabs users={users} />
        </TabsContent>

        <TabsContent value="role">
          <div className="sticky top-0 bg-background z-50	px-1">
            <HeaderUser route={"roles"} placeholder={"roles"} />
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};
