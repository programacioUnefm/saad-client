import { Chip } from "@/components/ui/chip";
import { TableCell, TableRow } from "@/components/ui/table";
import { ButtonsActions } from "../components/tabs/components/ButtonsActions";


export const ListPermissions = ({ permission, setAction, tabState }) => {
  return (
    <TableRow>
      <TableCell className="font-bold">{permission.name}</TableCell>
      <TableCell>{permission.description}</TableCell>
      <TableCell className="text-center">
        {permission.parent_id == null ? (
          <Chip text="N/A" />
        ) : (
          <Chip text={permission.parent_id} />
        )}
      </TableCell>
      <TableCell>
        <Chip text={permission.code} />
      </TableCell>
      <TableCell className="flex gap-2 justify-end">
        <ButtonsActions
          setAction={setAction}
          arrayItem={permission}
          tabState={tabState}
        />
      </TableCell>
    </TableRow>
  );
};
