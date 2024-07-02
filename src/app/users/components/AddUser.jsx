import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { RegisterForm } from "../../../login/components/RegisterForm";
export const AddUser = ({ addUserDialog, setaddUserDialog }) => {
  const closeDialogHandle = () => {
    setaddUserDialog(false);
  };
  return (
    <Dialog open={addUserDialog}>
      <Button variant="outline" size="md" onClick={() => setaddUserDialog(true)}>
        Agregar usuario
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Crear nuevo usuario</DialogTitle>
        </DialogHeader>
        <RegisterForm closeDialog={closeDialogHandle}/>
        <DialogFooter>
          <Button
            className="w-full bg-muted hover:bg-muted/80 h-12 uppercase"
            onClick={() => setaddUserDialog(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
