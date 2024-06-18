import { Button } from "@/components/ui/button";
import { Pencil, Terminal, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export const ButtonsActions = ({setAction, user}) => {
  return (
    <>
      <Button
        disabled={user.id == 1}
        className="dark:bg-accent dark:hover:bg-accent/50 bg-slate-400 hover:bg-slate-500  h-6  xl:h-[40px]"
        onClick={() => setAction({ dialog: true, action: "edit", user: user })}
      >
        <span className="hidden xl:block">Editar</span>
        <span className="block xl:hidden" style={{fontSize:"13px!important"}}>
          <Pencil size={"15px"}/>
        </span>
      </Button>
      <Button
        disabled={user.id == 1}
        className="dark:bg-accent dark:hover:bg-accent/50 bg-slate-400 hover:bg-slate-500  h-6  xl:h-[40px]"
        onClick={() => setAction({ dialog: true, action: "role", user: user })}
      >
        <span className="hidden xl:block">roles</span>
        <span className="block xl:hidden">
          <Terminal size={"15px"} />
        </span>
      </Button>
      <Button
        disabled={user.id == 1}
        className="bg-destructive hover:bg-destructive/50   h-6 xl:w-[65px] xl:h-[40px]"
        onClick={() =>
          setAction({ dialog: true, action: "delete", user: user })
        }
      >
        <span className="hidden xl:block">Eliminar</span>
        <span className="block xl:hidden">
          <Trash size={"15px"} />
        </span>
      </Button>
    </>
  );
};
