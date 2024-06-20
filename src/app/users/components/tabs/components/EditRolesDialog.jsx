import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RolesForm } from "../../RolesForm";


export const EditRolesDialog = ({ addRoleDialog, setAddRoleDialog, data = {} }) => {
  return (
    <Dialog open={addRoleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 uppercase">
            Agregar nuevo rol
          </DialogTitle>
        </DialogHeader>
        <RolesForm setAddRoleDialog={setAddRoleDialog} data={data}/>
      </DialogContent>
    </Dialog>
  );
};
