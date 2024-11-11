import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCountryForm } from "./forms/AddCountryForm";

export const AddListComboBox = ({title, dialogStatus, setdialogStatus, data}) => {
  return (
    <Dialog open={dialogStatus}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="uppercase">Agregar nuevo {title}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
          <div>
            {
                title === "país" && <AddCountryForm setdialogStatus={setdialogStatus} data={data}/>
            }
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
