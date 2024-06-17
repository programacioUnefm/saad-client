import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { layoutHandle } from "@/features/LayoutSelected";
import { layout } from "@/features/login/LoginSlice";
import { LayoutGrid, List } from "lucide-react";
import { useDispatch } from "react-redux";

export const HeaderUser = ({route = "", placeholder = ""}) => {
  const dispatch = useDispatch()
  const layoutDafult = localStorage.getItem("layoutList")
  const layoutChanged = (value) => {
    localStorage.setItem("layoutList", value);
    dispatch(layout(value));
  }
  return (
    <div className="grid grid-cols-2 mb-4">
      <div className="w-full">
        <Input type="email" placeholder={`buscar ${placeholder}...`} />
      </div>
      <div className="flex justify-end">
      <ToggleGroup type="single" onValueChange={(e) => layoutChanged(e)} defaultValue={layoutDafult}>
          <ToggleGroupItem value="grid">
            <LayoutGrid className="text-muted-foreground" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <List className="text-muted-foreground" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};
