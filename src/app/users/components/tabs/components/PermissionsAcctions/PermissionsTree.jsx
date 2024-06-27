import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const PermissionsTree = ({ item, setValue, setopen }) => {
  const handleSelect = (e) => {
    setopen(false);
    setValue("parent_id", e);
  };

  const TreeNode = ({ data }) => {
    return (
      <div className="w-full">
        <ToggleGroupItem
          className={
            data.children
              ? "w-full justify-start m-2 bg-accent hover:bg-accent/50"
              : "w-full justify-start m-1"
          }
          value={data}
          disabled={data.children
            ? false
            : true }
        >
          {data.name}
        </ToggleGroupItem>
        {data.children && data.children.length > 0 && (
          <div className="ml-4 mt-2 relative">
            <div className="bg-accent w-[2px] h-[100%] absolute"></div>
            {data.children.map((child) => (
              <div className="ml-2" key={child.id}>
                <TreeNode data={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <ToggleGroup
      className="flex flex-col items-start"
      type="single"
      onValueChange={(e) => handleSelect(e)}
    >
      <TreeNode data={item} />
    </ToggleGroup>
  );
};
