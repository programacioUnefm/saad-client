import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export const ConfirmDelete = ({ open, setAction, action, dialogAction, description = "" }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            Estás a punto de borrar algo importante.
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-accent hover:bg-accent/50"
            onClick={() => setAction({ dialog: false, action: "" })}
          >
            Cancelar
          </Button>
          <Button className="bg-destructive hover:bg-destructive/50" onClick={() => {setAction({ dialog: false, action: "" }); dialogAction(action.arrayItem)}}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
