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
import { useDispatch } from "react-redux";
import { useState } from "react";


// Componente ComboBox que gestiona un listado con búsqueda y opción de agregar elementos
export const ComboBox = ({
  list = [],
  title = "",
  label = "",
  keyLabel = null,
  addOption = false,
  setValue,
  disabled,
  value,
  error = {},
}) => {
  const [open, setOpen] = useState(false);           // Estado para controlar si el Popover está abierto o cerrado
  const [dialogStatus, setDialogStatus] = useState(false); // Estado para mostrar/ocultar el diálogo de adición
  const [data, setData] = useState(null);            // Estado para almacenar los datos del ítem seleccionado o agregado

  // Maneja la edición de un ítem (por ejemplo, en el caso de modificar un elemento existente)
  const editHandler = (item) => {
    setData(item);  // Establece los datos del ítem para editar
    setDialogStatus(true);  // Muestra el diálogo de edición
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      
      {/* Popover para mostrar el combobox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className={`justify-between mt-2 bg-accent/50 ${error.message ? "border-red-500" : ""}`}
            disabled={disabled}
          >
            {value.nombre === "" ? `Buscar ${title}` : value.nombre}
          </Button>
        </PopoverTrigger>

        {/* Mostrar mensaje de error si existe */}
        {error.message && (
          <span className="text-red-500 text-xs mt-2">{error.message}</span>
        )}

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
                      setDialogStatus(true); // Abre el diálogo para agregar
                      setData(null);  // Limpia los datos del ítem
                    }}
                  >
                    AGREGAR {title}
                  </CommandItem>
                )}

                {/* Mapeo de la lista de ítems disponibles */}
                {list.map((item) => (
                  <CommandItem
                    key={item.id}  // Usamos un id único para cada ítem en lugar de Math.random()
                    className="flex justify-between"
                    onSelect={() => {
                      setValue(keyLabel || title, item);  // Establece el valor seleccionado
                      setOpen(false);  // Cierra el combobox
                    }}
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
