import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export const ConfirmButton = ({
  open = false,
  setDialog,
  id = "",
  title = "",
  description = "",
  functionAction,
}) => {
  const disabled = "bg-destructive/80 w-full py-1 rounded-md text-white transition-all text-sm truncate opacity-50";
  const active = "bg-destructive/80 w-full hover:bg-destructive/50 py-1 rounded-md text-white transition-all text-sm truncate"
  return (
    <Dialog open={open}>
      <DialogTrigger
        className={id > 1 ? active : disabled} 
        disabled={id == 1}
        onClick={() => setDialog(true)}
      >
        Eliminar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            className="bg-accent hover:bg-accent/50"
            type="button"
            variant="outline"
            onClick={() => setDialog(false)}
          >
            Cancelar
          </Button>

          <Button
            className="bg-destructive hover:bg-destructive/50"
            onClick={() => {
              functionAction({ id });
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
