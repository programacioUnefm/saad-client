import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Terminal, Trash } from "lucide-react";
import { ButtonsActions } from "../ButtonsActions";
import { Chip } from "@/components/ui/chip";
import { RolesChip } from "../RolesChip";

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
      <TableCell className="text-primary hidden xl:table-cell whitespace-nowrap">
        {user.email}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <RolesChip user={user}/>
      </TableCell>
      <TableCell className="flex gap-2 justify-end">
        <ButtonsActions setAction={setAction} arrayItem={user} tabState={tabState} />
      </TableCell>
    </TableRow>
  );
};
