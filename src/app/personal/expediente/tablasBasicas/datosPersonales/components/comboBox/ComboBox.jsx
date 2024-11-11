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

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useDispatch } from "react-redux";
import { deleteCountry } from "@/features/personal/expediente/tablasBasicas/datosPersonales/DatosPerThunk";
import { useEffect, useState } from "react";

//el combobox recibe esos parametros para poder funcionar
export const ComboBox = ({
  list = [],
  title = "",
  label = "",
  defaultValue = null,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [realValue, setrealValue] = useState(defaultValue);
  const [dialogStatus, setdialogStatus] = useState(false);
  const [data, setdata] = useState(null);
  const dispatch = useDispatch();
  const editHandled = (item) => {
    setdata(item);
    setdialogStatus(true);
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className="justify-between mt-2 bg-accent/50"
          >
            {value == "" ? `Buscar ${title}` : value}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Buscar ${title}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup value={value}>
                {/* comando para agregar un nuevo item a la lista */}
                <CommandItem
                  className="font-bold text-primary hover:text-primary/10 uppercase"
                  onSelect={() => {
                    setdialogStatus(true);
                    setdata(null);
                  }}
                >
                  AGREGAR {title}
                </CommandItem>
                {/* comando para agregar un nuevo item a la lista */}

                {list.map((item) => (
                  <CommandItem
                  key={item.id}
                    onSelect={() => {
                      setValue(item.pais);
                      setOpen(false);
                    }}
                  >
                    {item.pais}
                    <Button
                      disabled={item.id == 1}
                      onClick={() => {
                        editHandled(item);
                      }}
                    >
                      EDITAR
                    </Button>
                    <Button
                      disabled={item.id == 1}
                      onClick={() => {
                        dispatch(deleteCountry(item.id));
                      }}
                    >
                      ELIMINAR
                    </Button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <AddListComboBox
        title={title}
        dialogStatus={dialogStatus}
        setdialogStatus={setdialogStatus}
        data={data}
      />
    </div>
  );
};
