import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridPermissions } from "../../layouts/GridPermissions";
import { TableHeaderPermissions } from "../../layouts/TableHeaderPermissions";
import { ListPermissions } from "../../layouts/ListPermissions";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";

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
      {permissions.data != undefined ? (
        layout == "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {permissions.data.map((permission) => (
              <GridPermissions
                key={permission.id}
                permission={permission}
                setAction={setAction}
                tabState={tabState}
              />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <Table className="bg-background p-2 rounded-sm">
              <TableHeaderPermissions />
              <TableBody>
                {permissions.data.map((permission) => (
                  <ListPermissions
                    key={Math.random()}
                    permission={permission}
                    tabState={tabState}
                    setAction={setAction}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )
      ) : 
        layout == "grid" ? <SkeletonGrid />: <SkeletonList />
      }
    </>
  );
};
