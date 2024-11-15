import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CargaFamComponent } from "./cargaFamiliar/CargaFamComponent";

export const TipoPersonalDialog = ({dialogStatus, setDialogStatus}) => {
  return (
    <Dialog open={dialogStatus.dialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="uppercase">{dialogStatus.title}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        {dialogStatus.action === "cargaFamiliar" && <CargaFamComponent setDialogStatus={setDialogStatus}/>}
      </DialogContent>
    </Dialog>
  );
};
