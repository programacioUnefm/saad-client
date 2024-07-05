import { TableCell, TableRow } from "@/components/ui/table";

import { Chip } from "@/components/ui/chip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ButtonsActions } from "../tabs/components/ButtonsActions";

export const ListUsers = ({ user, setAction, tabState }) => {
  return (
    <TableRow>
      <TableCell className="font-bold whitespace-nowrap">
        {user.document_id}
      </TableCell>
      <TableCell className="hidden lg:table-cell whitespace-nowrap">
        {user.name}
      </TableCell>
      <TableCell className="hidden lg:table-cell whitespace-nowrap">
        {user.last_name}
      </TableCell>
      <TableCell className="text-primary hidden xl:table-cell whitespace-nowrap truncate">
        {user.email}
      </TableCell>
      <TableCell className="hidden md:table-cell ">
        <div className="flex gap-2">
          {user.roles.slice(0, 2).map((rol) => (
            <Chip text={rol.name} key={Math.random()} />
          ))}
          {user.roles.length > 2 && (
            <Popover>
              <PopoverTrigger>
                <span className="border-2 px-2 rounded-md text-foreground/60 hover:text-foreground/100 cursor-pointer">
                  ...
                </span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-row max-w-60 flex-wrap gap-2">
                  {user.roles.map((rol) => (
                    <Chip key={Math.random()} text={rol.name} />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </TableCell>
      <TableCell className="flex gap-2 justify-end min-w-[100px] max-w-[300px]">
        <ButtonsActions
          setAction={setAction}
          arrayItem={user}
          tabState={tabState}
        />
      </TableCell>
    </TableRow>
  );
};
