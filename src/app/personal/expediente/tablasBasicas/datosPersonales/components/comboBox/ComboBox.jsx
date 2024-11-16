import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddListComboBox } from "./AddListComboBox";
import { useState } from "react";

export const ComboBox = ({
  list = [],
  title = "",
  label = "",
  keyLabel = null,
  addOption = false,
  setValue,
  disabled,
  value,
  trigger, // Recibimos trigger como prop
  error = {},
}) => {
  const [open, setOpen] = useState(false); // Estado para controlar si el Popover está abierto
  const [dialogStatus, setDialogStatus] = useState(false); // Estado para el diálogo de adición
  const [data, setData] = useState(null); // Datos del ítem seleccionado o agregado

  // Maneja la edición de un ítem
  const editHandler = (item) => {
    setData(item);
    setDialogStatus(true); // Muestra el diálogo de edición
  };

  // Maneja la selección de un ítem
  const handleSelect = (item) => {
    setValue(keyLabel || title, item); // Establece el valor seleccionado en el formulario
    setOpen(false); // Cierra el combobox
    trigger(); // Forzamos la validación del campo
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>

      {/* Popover para mostrar el ComboBox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className={`justify-between mt-2 bg-accent/50 ${
              error.message ? "border-red-500" : ""
            }`}
            disabled={disabled}
          >
            {value.nombre === "" ? `Buscar ${title}` : value.nombre}
          </Button>
        </PopoverTrigger>

        {/* Mostrar el mensaje de error */}
        <div className="mt-1">
          {error?.message ? (
            <span className="text-red-500 text-xs">{error.message}</span>
          ) : (
            <span className="text-xs opacity-0">ERROR</span>
          )}
        </div>

        {/* Contenido del Popover con la lista de opciones */}
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Buscar ${title}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontraron resultados...</CommandEmpty>
              <CommandGroup value={value}>
                {/* Opción para agregar un nuevo ítem */}
                {addOption && (
                  <CommandItem
                    className="font-bold text-primary hover:text-primary/10 uppercase"
                    onSelect={() => {
                      setDialogStatus(true); // Abre el diálogo de adición
                      setData(null); // Limpia los datos del ítem
                    }}
                  >
                    AGREGAR {title}
                  </CommandItem>
                )}

                {/* Mapeo de la lista de ítems */}
                {list.map((item) => (
                  <CommandItem
                    key={item.id} // Usamos un id único para cada ítem
                    className="flex justify-between"
                    onSelect={() => handleSelect(item)} // Llama a handleSelect para actualizar el valor y validar
                  >
                    {item.nombre}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Componente para agregar/modificar ítems */}
      <AddListComboBox
        title={title}
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        data={data}
      />
    </div>
  );
};
