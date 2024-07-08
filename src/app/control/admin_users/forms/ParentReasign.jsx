import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dialogChange } from "@/features/ui/UiSlice";
import { editPermission } from "@/features/control/usuarios/UsersThunks";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ParentReasign({ data }) {
  const { permissionsFull } = useSelector((state) => state.usersList);
  const [parent_id, setparent_id] = useState(data.id);
  const deafultCss =
    "w-[95%] flex p-2 rounded-md  justify-start m-2  data-[state=on]:text-white uppercase hover:bg-primary/40 data-[state=on]:bg-primary/80";
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const newData = {
      id: data.id,
      name: data.name,
      description: data.description,
      code: data.code,
      parent_id: parent_id,
    };
    const resp = await dispatch(editPermission(newData));
    if (resp == 200) {
      dispatch(
        dialogChange({
          title: `El permiso "${data.name}" ha sido reasignado`,
          message: "",
          status: true,
          duration: 3000,
          variant: "success",
        })
      );
      setTimeout(() => {
        dispatch(
          dialogChange({
            title: "",
            message: "",
            status: false,
            duration: 3000,
            variant: "",
          })
        );
      }, 3000);
    }
  };
  const TreeNode = ({ data }) => {
    return (
      <>
        <ToggleGroupItem
          className={
            data.children
              ? `${deafultCss} bg-primary/20`
              : `${deafultCss} data-[state=on]:bg-primary/80`
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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="truncate  text-foreground/70 text-[10px] border-2 bg-muted-foreground/20 hover:bg-accent p-1 uppercase rounded-md cursor-pointer">
          Reasignar
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-normal">
            Reasignar padre para:{" "}
            <span className="uppercase font-bold">"{data.name}"</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[88%] pr-4">
          <div className="mt-4">
            <ToggleGroup
              type="single"
              value={parent_id}
              onValueChange={(e) => setparent_id(e)}
            >
              {permissionsFull.map((element) => (
                <TreeNode key={Math.random()} data={element} />
              ))}
            </ToggleGroup>
          </div>
        </ScrollArea>
        <SheetFooter className="absolute bottom-10 w-full">
          <div className="grid grid-cols-2 w-full gap-2 mr-10">
            <SheetClose asChild>
              <Button variant="outline" size="md" type="button">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="button" size="md" onClick={onSubmit}>
              Reasignar padre
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
