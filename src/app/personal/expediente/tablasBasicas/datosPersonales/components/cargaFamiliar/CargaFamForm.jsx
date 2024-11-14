import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";

export const CargaFamForm = ({ data }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: data,
  });
  const onSubmit = (data) => console.log(data);
  console.log(watch());
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Cédula familiar</Label>
          <Input
            placeholder="Ej: 23453548"
            {...register("cedula_fam", { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <Label>Nombre 1</Label>
          <Input
            placeholder="Ej: Jhon"
            {...register("nombre1", { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <Label>Nombre 2</Label>
          <Input
            placeholder="Ej: Doe"
            {...register("nombre2", { required: true, maxLength: 20 })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <Label>Apellido 1</Label>
          <Input
            placeholder="Ej: 23453548"
            {...register("apellido1", { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <Label>Apellido 2</Label>
          <Input
            placeholder="Ej: Jhon"
            {...register("apellido2", { required: true, maxLength: 20 })}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div>
          <Label>Nacimiento</Label>
          <Input
            placeholder="Ej: 23453548"
            type="date"
            {...register("nacimiento")}
          />
        </div>
        <div>
          <Label>Parentesco</Label>
          <Select defaultValue={watch().parentesco}>
            <SelectTrigger {...register("parentesco")}>
              <SelectValue placeholder="seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="padre">Padre</SelectItem>
              <SelectItem value="hijo">Hijo</SelectItem>
              <SelectItem value="conyugue">Conyugue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>sexo</Label>
          <Select defaultValue={watch().sexo}>
            <SelectTrigger {...register("sexo")}>
              <SelectValue placeholder="seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Femenino</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>comboBox</div>
        <div>
          <Label>Registrado</Label>
          <Input
            placeholder="Ej: 23453548"
            type="date"
            {...register("registrado")}
          />
        </div>
        <div>
          <Label>FALLECIMIENTO</Label>
          <Input
            placeholder="Ej: 23453548"
            type="date"
            {...register("registrado")}
          />
        </div>
      </div>
    </form>
  );
};
