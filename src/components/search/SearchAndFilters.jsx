import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { InputSearch } from "./InputSearch";
import { layoutChanged } from "@/features/ui/UiSlice";

export const SearchAndFilters = ({ route = "", placeholder = "" }) => {
  const dispatch = useDispatch();
  const layoutDafult = localStorage.getItem("layoutList");
  const { layout, theme, paginationNumber, filters } = useSelector((state) => state.ui);
  const layoutChangedHandle = (value) => {
    localStorage.setItem("layoutList", value);
    dispatch(layoutChanged(value));
  };


  return (
    <div className="flex md:grid md:grid-cols-2 mb-4">
      <div className="w-full">
        <InputSearch route={route} placeholder={placeholder} />
      </div>
      <div className="flex justify-end">
        <ToggleGroup
          type="single"
          onValueChange={(value) => layoutChangedHandle(value)}
          defaultValue={layoutDafult}
        >
          <ToggleGroupItem
            value="grid"
            style={
              layout == "grid" && theme == "dark"
                ? { backgroundColor: "#1E293B" }
                : layout == "grid" && theme == "light"
                ? { backgroundColor: "#E2E8F0" }
                : null
            }
          >
            <LayoutGrid className="text-muted-foreground" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
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
      </div>
    </div>
  );
};
