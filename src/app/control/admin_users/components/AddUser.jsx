import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { permissionCheck } from "@/features/PermissionCheck";
import { RegisterForm } from "@/login/components/RegisterForm";
import { useSelector } from "react-redux";
export const AddUser = ({ addUserDialog, setaddUserDialog }) => {
  const closeDialogHandle = () => {
    setaddUserDialog(false);
  };
  const { permissions } = useSelector((state) => state.auth);
  return (
    <Dialog open={addUserDialog}>
      {permissionCheck(["CONTROL_USUARIOS", "USUARIOS_AGREGAR"],permissions) && (
        <Button
          variant="outline"
          className="fade-in-5 transition-all"
          size="md"
          onClick={() => setaddUserDialog(true)}
        >
          Agregar usuario
        </Button>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Crear nuevo usuario</DialogTitle>
        </DialogHeader>
        <RegisterForm closeDialog={closeDialogHandle} />
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
