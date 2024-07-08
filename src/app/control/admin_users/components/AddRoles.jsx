import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RolesForm } from "../forms/RolesForm";
import { useSelector } from "react-redux";
import { permissionCheck } from "@/features/PermissionCheck";

export const AddRoles = ({ addRoleDialog, setAddRoleDialog }) => {
  const { permissions } = useSelector((state) => state.auth);
  return (
    <Dialog open={addRoleDialog}>
      {permissionCheck(["USUARIOS_AGREGAR"],permissions) && (
      <Button variant="outline" size="md" onClick={() => setAddRoleDialog(true)}>
        Agregar rol
      </Button>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 uppercase">
            Agregar nuevo rol
          </DialogTitle>
        </DialogHeader>
        <RolesForm setAddRoleDialog={setAddRoleDialog} />
      </DialogContent>
    </Dialog>
  );
};
