import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useSelector } from "react-redux";

export const RoleAssign = ({ open, setAction, user, dialogAction }) => {
  const { roles } = useSelector((state) => state.usersList);
  const defaultRoles = [];
  user.roles.forEach(element => {
    defaultRoles.push(element.id)
  });
  const [rolActive, setRolActive] = useState([...defaultRoles])
  
  return (
    <Sheet open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="uppercase">Roles de "{user.name}"</SheetTitle>
          <div>
            <div className="grid grid-cols-2 my-4">
              <span className="font-bold uppercase">Nombre</span>
              <span className="font-bold uppercase text-right">Código</span>
            </div>
            <ToggleGroup type="multiple" value={rolActive} className="flex flex-col" onValueChange={(e) => {setRolActive(e)}}>
              {roles.data.map((role) => (
                <ToggleGroupItem
                  value={role.id}
                  className="w-full flex"
                  key={role.code}
                >
                  <span className="w-1/2 text-left">{role.name}</span>
                  <span className="w-1/2 text-right">{role.code}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </SheetHeader>
        <SheetFooter className="footerAction">
          <div className="flex w-full gap-2 mt-4">
            <Button
              className="w-1/2"
              size="md"
              variant="outline"
              onClick={() => {
                setAction({ dialog: false, action: "" });
              }}
            >
              Cancelar
            </Button>
            <Button
              className="w-1/2"
              size="md"
              onClick={() => {
                setAction({ dialog: false, action: "" });
                dialogAction({user, rolActive});
              }}
            >
              Asignar roles
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
