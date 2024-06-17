import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Terminal, Trash } from "lucide-react";
import { ButtonsActions } from "./ButtonsActions";

export const ListUsers = ({ user, setAction }) => {
  return (
    <TableRow>
      <TableCell className="font-bold ">
        {user.document_id}
      </TableCell>
      
      <TableCell className="hidden md:table-cell" >
        {user.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {user.last_name}
      </TableCell>
      <TableCell className="text-primary hidden md:table-cell">
        {user.email}
      </TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="flex gap-2 justify-end">
        <ButtonsActions setAction={setAction} user={user}/>
      </TableCell>
    </TableRow>
  );
};
