import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const FormSelectSimple = ({
  label,
  options,
  register,
  name,
  defaultValue,
  setValue,
  error,
}) => {
  return (
    //TODO: optimizar para poder leer los errores al momento de seleccionar una opción
    <div>
      <label>{label}</label>
      <Select
        defaultValue={defaultValue}
        onValueChange={(e) => setValue(name, e)}
      >
        <SelectTrigger
          {...register(name)}
          className={error ? "border-red-500" : ""}
        >
          <SelectValue placeholder={`Seleccionar ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <span className="text-red-500 text-xs">{error.message}</span>
      ) : (
        <span className="text-xs opacity-0">ERROR</span>
      )}
    </div>
  );
};
