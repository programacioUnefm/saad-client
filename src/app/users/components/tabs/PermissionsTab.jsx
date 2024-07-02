import { useToast } from "../../../../components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TooltipPermission } from "./components/TooltipPermission";
import { AddPermisionCard } from "./components/AddPermisionCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Chip } from "@/components/ui/chip";

export const PermissionsTab = ({ permissions, tabState }) => {
  const { permissionsFull } = useSelector((state) => state.usersList);
  const [dataSort, setdataSort] = useState(null);
  const [parent, setparent] = useState(null);

  useEffect(() => {
    if (permissionsFull.length > 0) {
      const sortedData = sortObjectsRecursively(permissionsFull);
      setdataSort(sortedData);
    }
  }, [permissionsFull]);

  const sortObjectsRecursively = (arr) => {
    const withoutChildren = [];
    const withChildren = [];
    arr.forEach((item) => {
      if (item.children) {
        withChildren.push(item);
        sortObjectsRecursively(item.children);
      } else {
        withoutChildren.push(item);
      }
    });
    return [...withoutChildren, ...withChildren];
  };

  const TreeNode = ({ data }) => {
    return (
      <div className="my-1 text-[12px]">
        <div
          className={
            data.children
              ? "flex justify-between text-accent-foreground/90 hover:text-accent-foreground transition-all uppercase cursor-pointer"
              : "flex justify-between text-muted-foreground hover:text-accent-foreground transition-all uppercase cursor-pointer"
          }
        >
          <TooltipPermission
            tooltip={data.name}
            message={data.description}
            data={data}
            action={(e) => setparent(e)}
          />
          <span className="truncate">
            <Chip text={data.code} />
          </span>
        </div>
        {data.children && (
          <div className="ml-2 my-2 relative">
            <div className="bg-primary/20 dark:bg-accent w-[4px] h-[100%] absolute left-4"></div>
            {data.children.map((children) => (
              <div key={children.id}>
                <div className="ml-4 mt-1 relative">
                  <TreeNode data={children} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="flex">
          <AddPermisionCard parent={parent} setparent={setparent} />
        </div>
        <ScrollArea className="h-[62vh] border-2 border-dashed p-4 rounded-md bg-white dark:bg-accent/20 flex justify-center">
          {dataSort != null &&
            dataSort.map((parent) => (
              <TreeNode key={parent.id} data={parent} />
            ))}
        </ScrollArea>
      </div>
    </>
  );
};
