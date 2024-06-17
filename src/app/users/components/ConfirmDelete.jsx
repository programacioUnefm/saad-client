import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export const ConfirmDelete = ({ open, setAction, action, dialogAction }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">
            ¿Estás segur@ de eliminar el usuario?
          </DialogTitle>
          <DialogDescription>
            Borrar este usuario puede ser peligroso para el sistema ¿estás
            completamente seguro de borrarlo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-accent hover:bg-accent/50"
            onClick={() => setAction({ dialog: false, action: "" })}
          >
            Cancelar
          </Button>
          <Button className="bg-destructive hover:bg-destructive/50" onClick={() => {setAction({ dialog: false, action: "" }); dialogAction(action.user)}}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
