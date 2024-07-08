import { layoutChanged } from "@/features/ui/UiSlice";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { LayoutGrid, List } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const LayoutData = () => {
    const dispatch = useDispatch();
  const layoutDafult = localStorage.getItem("layoutList");
  const { layout, theme } = useSelector(
    (state) => state.ui
  );
  const layoutChangedHandle = (value) => {
    localStorage.setItem("layoutList", value);
    dispatch(layoutChanged(value));
  };

  return (
    <ToggleGroup
      type="single"
      onValueChange={(value) => layoutChangedHandle(value)}
      defaultValue={layoutDafult}
    >
      <ToggleGroupItem
        value="grid"
        className="px-3 py-2 rounded-md "
        style={
          layout == "grid" && theme == "dark"
            ? { backgroundColor: "#1E293B"}
            : layout == "grid" && theme == "light"
            ? { backgroundColor: "#E2E8F0" }
            : null
        }
      >
        <LayoutGrid className="text-muted-foreground" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        className="px-3 py-2 rounded-md "
        style={
          layout == "list" && theme == "dark"
            ? { backgroundColor: "#1E293B" }
            : layout == "list" && theme == "light"
            ? { backgroundColor: "#E2E8F0" }
            : null
        }
      >
        <List className="text-muted-foreground" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
