import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { RolesForm } from "../../forms/RolesForm";



export const EditRolesDialog = ({ addRoleDialog, setAddRoleDialog, data = {} }) => {
  return (
    <Dialog open={addRoleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 uppercase">
            Editar rol "{data.name}"
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <RolesForm setAddRoleDialog={setAddRoleDialog} data={data}/>
      </DialogContent>
    </Dialog>
  );
};
