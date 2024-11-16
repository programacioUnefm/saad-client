import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Componente FormSelect: Un componente de selección reutilizable para formularios.
 * Integra React Hook Form para manejar el estado y la validación del formulario.
 * 
 * Props:
 * - label: Texto que describe el propósito del campo de selección.
 * - options: Opciones disponibles para el select, pueden ser simples (arreglo de strings) o complejas (arreglo de objetos con `value` y `label`).
 * - register: Función de React Hook Form para registrar el campo.
 * - name: Nombre del campo en el formulario.
 * - defaultValue: Valor inicial del campo.
 * - setValue: Función de React Hook Form para establecer manualmente el valor del campo.
 * - trigger: Función de React Hook Form para forzar la validación del campo.
 * - error: Objeto de error proporcionado por React Hook Form, contiene información sobre errores de validación.
 */
export const FormSelect = ({
  label,
  options,
  register,
  name,
  defaultValue,
  setValue,
  trigger,
  error,
}) => {
  /**
   * Normaliza las opciones para manejar tanto arreglos simples como objetos.
   * Si una opción es un string, se convierte en un objeto con propiedades `value` y `label`.
   * 
   * @param {Array} options - Lista de opciones para el select.
   * @returns {Array} Lista de opciones normalizadas.
   */
  const normalizeOptions = (options) => {
    return options.map(
      (option) =>
        typeof option === "object" && option !== null
          ? option // Si la opción ya es un objeto, se usa directamente.
          : { value: option, label: option } // Si es un string, se convierte en objeto.
    );
  };

  /**
   * Maneja el cambio de valor en el componente Select.
   * Actualiza el valor del campo en el formulario y fuerza su validación.
   * 
   * @param {string} value - Nuevo valor seleccionado.
   */
  const handleValueChange = (value) => {
    // Actualiza el valor del campo en el estado del formulario.
    setValue(name, value);

    // Fuerza la validación del campo para reflejar posibles errores inmediatamente.
    trigger(name);
  };

  // Normaliza las opciones para que sean consistentes (siempre en formato de objeto).
  const normalizedOptions = normalizeOptions(options);

  return (
    <div>
      {/* Etiqueta del campo */}
      <label>{label}</label>

      {/* Componente Select principal */}
      <Select
        defaultValue={defaultValue} // Establece el valor por defecto
        onValueChange={handleValueChange} // Maneja el cambio de valor
      >
        {/* Disparador del Select con soporte para React Hook Form */}
        <SelectTrigger
          {...register(name)} // Registra el campo en React Hook Form
          className={error ? "border-red-500" : ""} // Aplica estilo si hay error
        >
          <SelectValue placeholder={`Seleccionar ${label}`} />
        </SelectTrigger>

        {/* Contenedor de las opciones del Select */}
        <SelectContent>
          {normalizedOptions.map((option) => (
            <SelectItem
              key={option.value} // Clave única para cada opción
              value={option.value} // Valor de la opción
            >
              {option.label} {/* Texto visible de la opción */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Mensaje de error (si existe) */}
      {error ? (
        <span className="text-red-500 text-xs">{error.message}</span> // Muestra el mensaje de error
      ) : (
        <span className="text-xs opacity-0">ERROR</span> // Placeholder para mantener consistencia visual
      )}
    </div>
  );
};
