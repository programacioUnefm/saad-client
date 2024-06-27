import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RolesForm } from "./RolesForm";

export const AddRoles = ({ addRoleDialog, setAddRoleDialog }) => {
  return (
    <Dialog open={addRoleDialog}>
      <Button className="uppercase" variant="outline" onClick={() => setAddRoleDialog(true)}>
        Agregar rol
      </Button>
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
