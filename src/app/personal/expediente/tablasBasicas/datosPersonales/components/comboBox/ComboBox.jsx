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
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

//el combobox recibe esos parametros para poder funcionar
export const ComboBox = ({
  list = [],
  title = "",
  label = "",
  keyLabel = null,
  addOption = false,
  setValue,
  disabled,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [dialogStatus, setdialogStatus] = useState(false);
  const [data, setdata] = useState(null);
  const dispatch = useDispatch();
  const editHandled = (item) => {
    setdata(item);
    setdialogStatus(true);
    // console.log(item)
    // setValue("pais", item)
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
            disabled={disabled}
          >
            {value.nombre == "" ? `Buscar ${title}` : value.nombre}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Buscar ${title}...`} className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontraron resultados...</CommandEmpty>
              <CommandGroup value={value}>
                {/* comando para agregar un nuevo item a la lista */}
                {addOption && (
                  <CommandItem
                    className="font-bold text-primary hover:text-primary/10 uppercase"
                    onSelect={() => {
                      setdialogStatus(true);
                      setdata(null);
                    }}
                  >
                    AGREGAR {title}
                  </CommandItem>
                )}
                {/* comando para agregar un nuevo item a la lista */}
                {list.map((item) => (
                  <CommandItem
                    className="flex justify-between"
                    key={Math.random()}
                    onSelect={() => {
                      setValue(keyLabel ? keyLabel : title, item);
                      setOpen(false);
                    }}
                  >
                    
                    {item.nombre}
                    {/* {addOption && (
                      <Button
                        disabled={item.id == 1}
                        variant="outline"
                        onClick={() => {
                          editHandled(item);
                        }}
                      >
                        <Pencil size={10} />
                      </Button>
                    )} */}
                    {/* <Button
                      disabled={item.id == 1}
                      onClick={() => {
                        dispatch(deleteCountry(item.id));
                      }}
                    >
                      ELIMINAR
                    </Button> */}
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
