import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccordionItems } from "./AccordionItems";
import permissions from "./permission.json";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ParentIdAssign = ({ open, setopen, setValue }) => {
  return (
    <Sheet open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Asignar permiso padre</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[88%] pr-4">
          <div className="mt-2 text-sm">
            {permissions.map((permission) => (
              <AccordionItems key={Math.random()} setValue={setValue} item={permission} setopen={setopen} />
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="mt-2 grid grid-cols-2 gap-4 absolute bottom-10  w-[87%]">
            <Button
              className="bg-accent hover:bg-accent/50"
              onClick={() => setopen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/50"
              onClick={() => {setopen(false); setValue("parent_id", "")}}
            >
              Sin padre
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
