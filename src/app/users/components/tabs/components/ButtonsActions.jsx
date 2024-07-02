import { Button } from "@/components/ui/button";
import { Pencil, Terminal, Trash } from "lucide-react";

export const ButtonsActions = ({ setAction, arrayItem, tabState }) => {
  
  return (
    <>
      <Button
        disabled={arrayItem.id == 1}
        className="w-full"
        onClick={() =>
          setAction({ dialog: true, action: "edit", arrayItem: arrayItem })
        }
      >
        <span className="hidden xl:block uppercase text-[10px]">Editar</span>
        <span
          className="block xl:hidden"
          style={{ fontSize: "13px!important" }}
        >
          <Pencil size={"15px"} />
        </span>
      </Button>
      {tabState == "users" || tabState == "roles" ? (
          <Button
            disabled={arrayItem.id == 1}
            className="w-full"
            onClick={() =>
              setAction({
                dialog: true,
                action: "assign",
                arrayItem: arrayItem,
              })
            }
          >
            <span className="hidden xl:block uppercase text-[10px]">
              {tabState == "users" ? "roles" : "Permisos"}
            </span>
            <span className="block xl:hidden">
              <Terminal size={"15px"} />
            </span>
          </Button>
        ): ""}
      <Button
        disabled={arrayItem.id == 1}
        className="dark:bg-destructive/80 dark:hover:bg-destructive hover:bg-destructive bg-destructive/80 w-full text-white"
        onClick={() =>
          setAction({ dialog: true, action: "delete", arrayItem: arrayItem })
        }
      >
        <span className="hidden xl:block uppercase text-[10px]">Eliminar</span>
        <span className="block xl:hidden">
          <Trash size={"15px"} />
        </span>
      </Button>
    </>
  );
};
