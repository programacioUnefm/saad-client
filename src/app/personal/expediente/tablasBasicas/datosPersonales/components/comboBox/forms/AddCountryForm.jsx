import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddCountry, editCountry } from "@/features/personal/expediente/tablasBasicas/datosPersonales/DatosPerThunk";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

export const AddCountryForm = ({ setdialogStatus, data = {} }) => {
  const { handleSubmit, register, formState:{errors} } = useForm({
    defaultValues: data
  });
  const dispatch = useDispatch();
  const onSubmit = (dataForm) => {
    data != null? dispatch(editCountry(dataForm)): dispatch(AddCountry(dataForm));
    setdialogStatus(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <Label>País</Label> */}
          <Input
            placeholder="Introduzca nuevo país"
            {...register("pais", { required: true, minLength:3, maxLength: 20 })}
            errors={errors.pais != undefined ? "true" : "false"}
          />
        </div>
        <div className="flex gap-2 mt-8">
          <Button type="button" variant="outline" onClick={() => {setdialogStatus(false)}}>Cancelar</Button>
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </>
  );
};
