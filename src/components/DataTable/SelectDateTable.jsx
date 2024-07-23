import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SelectDateTable(header, filtersTable, setFiltersTable) {
  const item = header.header.column.columnDef.header.toLowerCase();
  const options = header.header.column.columnDef.meta.options;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-[35px] lowercase">
          Seleccionar {item}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="uppercase">{item}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((element) => (
          <DropdownMenuCheckboxItem
            // checked={showStatusBar}
            // onCheckedChange={setShowStatusBar}
            
            key={element.key}
          >
            {element.key}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
