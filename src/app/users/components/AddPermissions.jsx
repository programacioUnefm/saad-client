import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { PermissionsForm } from "./PermissionsForm";


export const AddPermissions = ({ addPermissionsDialog, setPermissionsDialog }) => {
    
    
    
  return (
    <Dialog open={addPermissionsDialog}>
      <Button variant="outline" onClick={() => setPermissionsDialog(true)}>
        Agregar permiso
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 uppercase">
            Agregar nuevo permiso
          </DialogTitle>
        </DialogHeader>
        <PermissionsForm setPermissionsDialog={setPermissionsDialog}/>
      </DialogContent>
    </Dialog>
  );
};
