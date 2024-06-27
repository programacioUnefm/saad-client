import { ScrollArea } from "@/components/ui/scroll-area";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
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
import { Label } from "@/components/ui/label";

export function PermissionsParent({ permissions, register, parent_id }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-4">
      <Label>Permiso padre</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full justify-between h-14">
            {value
              ? permissions.find((permission) => permission.name === value)
                  ?.name
              : "Buscar permiso..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar padre..." className="h-9" />
            <ScrollArea className="h-[200px] p-2">
              <CommandList>
                <CommandEmpty>No existe este permiso.</CommandEmpty>
                <CommandGroup>
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      onClick={parent_id("parent_id", permission.id)}
                    >
                      <CommandItem
                        {...register("parent_id")}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {permission.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === permission.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    </div>
                  ))}
                </CommandGroup>
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
