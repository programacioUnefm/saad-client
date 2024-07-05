import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PermissionsForm } from "../../PermissionsForm";

export const EditPermissionsDIalog = ({ action, setAction }) => {
  return (
    <Dialog open={action.dialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 uppercase">
            Editar permiso
          </DialogTitle>
        </DialogHeader>
        <PermissionsForm setPermissionsDialog={setAction} data={action.arrayItem} />
      </DialogContent>
    </Dialog>
  );
};
