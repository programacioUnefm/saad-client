import React from "react";
import { Input } from "./ui/input"; // Importa el componente Input desde la ubicación indicada

/**
 * Componente FormInput:
 * Un campo de entrada reutilizable para formularios con soporte para validación.
 * 
 * Props:
 * - label: Texto de la etiqueta del campo.
 * - register: Función de registro del hook de formularios (como React Hook Form).
 * - name: Nombre del campo, que se utiliza para identificarlo en el formulario.
 * - type: Tipo del input (por defecto "text").
 * - placeholder: Texto que se muestra como sugerencia cuando el campo está vacío.
 * - error: Objeto que contiene información sobre errores de validación para este campo.
 */
export const FormInput = ({
  label,           
  register,        
  name,            
  type = "text",   
  placeholder,     
  error,           
}) => {
  return (
    <div className="form-input-container">
      {/* Etiqueta asociada al campo */}
      <label htmlFor={name} className="dark:text-gray-400">{label}</label>
      {/* Campo de entrada principal */}
      <Input
        type={type}                              // Define el tipo del input (texto, número, etc.)
        placeholder={placeholder}               // Establece el placeholder del campo
        className={error ? "border-red-500" : ""} // Aplica estilo condicional si hay error
        
        // Registra el campo en el formulario utilizando React Hook Form
        {...register(name, {
          setValueAs: (value) => {
            /**
             * Transforma el valor ingresado antes de almacenarlo:
             * - Si el valor es null, retorna null.
             * - Si el valor es una cadena vacía, retorna "".
             * - Si el tipo es "number", convierte el valor a un número flotante.
             */
            if (value === null) return null;
            if (value === "") return "";
            return type === "number" ? parseFloat(value) : value;
          }
        })}
      />
      
      {/* Manejo de errores */}
      {error ? (
        // Muestra el mensaje de error en rojo si existe un error de validación
        <span className="text-red-500 text-xs">{error.message}</span>
      ) : (
        // Espacio reservado para mantener consistencia visual si no hay error
        <span className="text-xs opacity-0">ERROR</span>
      )}
    </div>
  );
};
