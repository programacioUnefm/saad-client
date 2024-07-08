import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { updatePermissionToRole } from "@/features/usuarios/UsersThunks";
import { dialogChange } from "@/features/ui/UiSlice";

export const PermissionsAssign = ({
  addPermissions,
  setaddPermissions,
  data = {},
}) => {
  const { permissionsFull } = useSelector((state) => state.usersList);
  const [active, setactive] = useState([]);
  const dispatch = useDispatch();
  const onAssignHandle = async () => {
    const resp = await dispatch(
      updatePermissionToRole({ permissions: active }, data.id)
    );
    if (resp == 200) {
      dispatch(
        dialogChange({
          title: "Permisos asignados",
          message: "La lista de permisos ha sido asignada al rol",
          status: true,
          duration: 3000,
        })
      );
      setTimeout(() => {
        dispatch(
          dialogChange({
            title: "",
            message: "",
            status: false,
            duration: 3000,
          })
        );
      }, 3000);
      setaddPermissions(false);
    }
  };

  useEffect(() => {
    if (data.permissions.length > 0) {
      setactive([]);
      data.permissions.forEach((element) => {
        setactive((prev) => [...prev, element.id]);
      });
    }else{
      setactive([]);
    }
  }, [data]);

  const TreeNode = ({ data }) => {
    return (
      <>
        <ToggleGroupItem
          className={
            data.children
              ? "w-[95%] justify-start m-2 bg-primary/20 hover:bg-primary/40 data-[state=on]:bg-primary/80 data-[state=on]:text-white uppercase"
              : "w-[95%] justify-start m-1 hover:bg-primary/40 data-[state=on]:bg-primary/80 data-[state=on]:text-white uppercase"
          }
          value={data.id}
        >
          {data.name}
        </ToggleGroupItem>
        {data.children && data.children.length > 0 && (
          <div className="ml-4 mt-2 relative">
            <div className="bg-primary/20 dark:bg-accent w-[2px] h-[100%] absolute"></div>
            {data.children.map((child) => (
              <div className="ml-2 my-2" key={child.id}>
                <TreeNode data={child} />
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const parentVerify = (e) => {
    setactive(e);
  };

  return (
    <Sheet open={addPermissions}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="uppercase">
            permisos para <span className="truncate">"{data.name}"</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[88%] pr-4">
          <div className="mt-4">
            <ToggleGroup
              type="multiple"
              value={active}
              onValueChange={(e) => parentVerify(e)}
            >
              <TreeNode data={permissionsFull} />
            </ToggleGroup>
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="mt-2 grid grid-cols-2 gap-4 absolute bottom-10  w-[87%]">
            <Button
              onClick={() => setaddPermissions(false)}
              size="md"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button size="md" onClick={() => onAssignHandle()}>Asignar</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
