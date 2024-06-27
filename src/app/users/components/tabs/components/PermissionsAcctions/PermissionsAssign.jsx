import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { PermissionTree } from "./PermissionTree";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import permissions from'./permission.json';


export const PermissionsAssign = ({
  addPermissions,
  setaddPermissions,
  data = {},
}) => {
  const { permissionsFull } = useSelector((state) => state.usersList);
  
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
            <Accordion type="single" collapsible defaultValue="item-1">
              {permissions.map((subPermission) => (
                <AccordionItem value="item-1" key={Math.random()}>
                  <AccordionTrigger>{subPermission.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-4">
                      <PermissionTree subPermission={subPermission} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
