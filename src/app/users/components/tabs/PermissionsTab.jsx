import { TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Table } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridPermissions } from "./components/layouts/GridPermissions";

export const PermissionsTab = ({ permissions, tabState }) => {
  const { layout } = useSelector((state) => state.ui);
  const [action, setAction] = useState({
    dialog: false,
    action: "",
    arrayItem: {},
  });
  const dispatch = useDispatch();
  const { toast } = useToast();

  return (
    <>
      {layout == "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {permissions.map((permission) => (
            <GridPermissions key={permission.id} permission={permission} setAction={setAction} tabState={tabState}/>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Table>
            {/* <TableHeaderUsers /> */}
            <TableBody>
              {/* {users.map((user) => (
              <ListUsers user={user} key={user.id} setAction={setAction} />
            ))} */}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};
