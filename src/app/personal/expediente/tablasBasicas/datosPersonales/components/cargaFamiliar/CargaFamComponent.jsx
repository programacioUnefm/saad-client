import { Button } from "@/components/ui/button";
import React from "react";
import { CargaFamForm } from "./CargaFamForm";

export const CargaFamComponent = ({ setDialogStatus }) => {
  const data = {
    empleado_id: null,
    tipo_discapacidad_id: null,
    cedula_fam: "",
    nombre1: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
    nacimiento: "",
    sexo: "M",
    parentesco: "padre",
    registrado: "",
    fallecimiento: "",
  };
  return (
    <div>
      <CargaFamForm data={data}/>
      <div className="">
        <Button
          onClick={() =>
            setDialogStatus({ dialog: false, action: "", title: "" })
          }
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};
