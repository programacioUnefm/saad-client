import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const FormSelect = ({
  label,
  options,
  register,
  name,
  defaultValue,
  setValue,
  error,
}) => {
  //TODO: optimizar para poder leer los errores al momento de seleccionar una opción
  return (
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
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
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
