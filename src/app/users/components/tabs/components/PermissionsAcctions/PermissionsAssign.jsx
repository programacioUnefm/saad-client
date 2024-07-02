import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import permissions from "./permission.json";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { ToggleGroupItem } from "@/components/ui/toggle-group";

export const PermissionsAssign = ({
  addPermissions,
  setaddPermissions,
  data = {},
}) => {
  const { permissionsFull } = useSelector((state) => state.usersList);
  const [active, setactive] = useState([]);
  const TreeNode = ({ data }) => {
    return (
      <div className="w-full">
        <ToggleGroupItem
          className={
            data.children
              ? "w-[95%] justify-start m-2 bg-primary/20 hover:bg-primary/40 data-[state=on]:bg-primary/80 data-[state=on]:text-white"
              : "w-[95%] justify-start m-1 hover:bg-primary/40 data-[state=on]:bg-primary/80 data-[state=on]:text-white"
          }
          onClick={() => parentVerify(data)}
          value={data.id}
        >
          <div className="grid grid-cols-2 w-full">
            <div className="w-[150%] text-left">
              <span>{data.name}</span>
            </div>
            {data.parent && !data.children && (
              <div className="text-right">
                <span className="text-[8px] uppercase truncate font-bold">
                  {data.parent.name}
                </span>
              </div>
            )}
            {data.children && <div className="text-right uppercase text-[10px] font-bold">Padre</div>}
          </div>
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
      </div>
    );
  };

  const parentVerify = (e) => {
    e.status = !e.status;
    let ids = [];

    if (e.children) {
      ids.push(e.id);
      const children = recursiveMap(e);
      ids = [...children];
      if (e.status) {
        setactive([...active, ...ids]);
        e.children.forEach((element) => {
          element.status = true;
        });
      } else {
        const result = active.filter((id) => !ids.includes(id));
        setactive([...result]);
        e.children.forEach((element) => {
          element.status = false;
        });
      }
    } else {
      if (e.status) {
        setactive([...active, e.id]);
      } else {
        const result = active.filter((item) => item !== e.id);
        setactive([...result]);
      }
    }
  };

  let ids = [];

  const recursiveMap = (object) => {
    ids.push(object.id);
    if (object.children) {
      object.children.forEach((child) => {
        recursiveMap(child);
      });
    }
    return ids;
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
            <ToggleGroup type="multiple" value={active}>
              <TreeNode data={permissionsFull[0]} />
            </ToggleGroup>
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="mt-2 grid grid-cols-2 gap-4 absolute bottom-10  w-[87%]">
            <Button
              className="bg-accent hover:bg-accent/50"
              onClick={() => setaddPermissions(false)}
            >
              Cancelar
            </Button>
            <Button>Asignar</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
