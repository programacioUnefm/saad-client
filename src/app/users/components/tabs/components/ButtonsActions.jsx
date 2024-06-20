import { Button } from "@/components/ui/button";
import { Pencil, Terminal, Trash } from "lucide-react";

export const ButtonsActions = ({ setAction, arrayItem, tabState }) => {
  
  return (
    <>
    
      <Button
        disabled={arrayItem.id == 1}
        className="dark:bg-accent dark:hover:bg-accent/50 bg-slate-400 hover:bg-slate-500  h-6  w-full xl:h-[40px]"
        onClick={() =>
          setAction({ dialog: true, action: "edit", arrayItem: arrayItem })
        }
      >
        <span className="hidden xl:block">Editar</span>
        <span
          className="block xl:hidden"
          style={{ fontSize: "13px!important" }}
        >
          <Pencil size={"15px"} />
        </span>
      </Button>
      {tabState == "users" || tabState == "role" ? (
          <Button
            disabled={arrayItem.id == 1}
            className="dark:bg-accent dark:hover:bg-accent/50 bg-slate-400 hover:bg-slate-500  h-6  w-full xl:h-[40px]"
            onClick={() =>
              setAction({
                dialog: true,
                action: "assign",
                arrayItem: arrayItem,
              })
            }
          >
            <span className="hidden xl:block">
              {tabState == "users" ? "roles" : "Permisos"}
            </span>
            <span className="block xl:hidden">
              <Terminal size={"15px"} />
            </span>
          </Button>
        ): ""}
      <Button
        disabled={arrayItem.id == 1}
        className="bg-destructive hover:bg-destructive/50 h-6 w-full xl:h-[40px]"
        onClick={() =>
          setAction({ dialog: true, action: "delete", arrayItem: arrayItem })
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
