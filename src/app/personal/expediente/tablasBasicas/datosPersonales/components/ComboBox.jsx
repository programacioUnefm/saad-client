import * as React from "react";
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


export const ComboBox = ({list = "", title = "", label = "", defaultValue = null}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="lg"
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
                {list.map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => {
                      setValue(item);
                      setOpen(false);
                    }}
                  >
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
