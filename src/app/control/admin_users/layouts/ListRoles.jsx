import { Chip } from "@/components/ui/chip";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonsActions } from "../tabs/components/ButtonsActions";

export const ListRoles = ({ tabState, setAction, rol }) => {
  return (
    <TableRow>
      <TableCell className="font-bold text-nowrap">{rol.name}</TableCell>
      <TableCell>
        {rol.description != null ? (
          rol.description
        ) : (
          <span className="text-primary">N/E</span>
        )}
      </TableCell>
      <TableCell className="flex gap-2">
        {rol.permissions.slice(0, 2).map((permission) => (
          <Chip key={Math.random()} text={permission.name} />
        ))}
        {rol.permissions.length > 2 && (
          <Popover>
            <PopoverTrigger>
              <span className="border-2 px-2 rounded-md text-foreground/60 hover:text-foreground/100 cursor-pointer">
                ...
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-row max-w-60 flex-wrap gap-2">
                {rol.permissions.map((permission) => (
                  <Chip key={Math.random()} text={permission.name} />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </TableCell>
      <TableCell className="text-center"><Chip text={rol.code} /></TableCell>
      
      <TableCell className="flex gap-2 justify-end min-w-[100px] max-w-[300px]">
        <ButtonsActions
          setAction={setAction}
          arrayItem={rol}
          tabState={tabState}
        />
      </TableCell>
    </TableRow>
  );
};
