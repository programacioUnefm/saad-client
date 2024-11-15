import React from "react";
import { Input } from "./ui/input";

export const FormInput = ({
  label,
  register,
  name,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <div className="">
      <label>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        className={error ? "border-red-500" : ""}
        {...register(name)}
      />
      {error ? (
        <span className="text-red-500 text-xs">{error.message}</span>
      ) : (
        <span className="text-xs opacity-0">ERROR</span>
      )}
    </div>
  );
};
