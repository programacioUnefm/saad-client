import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dialogChange, resetDialog } from "@/features/ui/UiSlice";

export const IdiomasInput = ({ idiomas, setValue }) => {
  const [value, setvalue] = useState(["Español"]);
  const dispatch = useDispatch();

  const idiomaSelect = (e) => {
    if (e[0] == "Español") {
      setvalue(e);
    } else {
      setvalue([...value]);
      dispatch(
        dialogChange({
          title: "",
          message: "No es posible quitar español de la lista.",
          status: true,
          duration: 3000,
          variant: "destructive",
        })
      );
      setTimeout(() => {
        dispatch(resetDialog());
      }, 3000);
    }
    if (e.length > 3) {
      setvalue([...value]);
      dispatch(
        dialogChange({
          title: "",
          message: "No es posible agregar más de 3 idiomas.",
          status: true,
          duration: 3000,
          variant: "destructive",
        })
      );
      setTimeout(() => {
        dispatch(resetDialog());
      }, 3000);
    }
  };

  useEffect(() => {
    setValue("idiomas", value)
  }, [value])
  

  return (
    <div className="flex flex-col items-start  ">
      <label className="mb-2">Selecciona idiomas</label>
      <Popover>
        <PopoverTrigger className="w-full">
          <span className="bg-accent/50 p-2 rounded-md flex">
            {value.map((item, index) => {
              const isLastItem = index === value.length - 1;
              return (
                <span key={index} className="text-[15px]">
                  {item}
                  {!isLastItem && "-"}
                </span>
              );
            })}
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <ScrollArea className="h-[200px] pr-8">
            <ToggleGroup
              type="multiple"
              variant="outline"
              className="flex flex-col"
              value={value}
              onValueChange={(e) => idiomaSelect(e)}
            >
              {idiomas.map((option, index) => (
                <ToggleGroupItem
                  className="w-full uppercase"
                  key={index}
                  value={option}
                  aria-label="Toggle bold"
                >
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};
