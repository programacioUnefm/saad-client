import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function RageDate({ filters, setfilters }) {
  const [date, setDate] = React.useState({
    from: "",
    to: "",
  });

  const dateHandle = (e) => {
    setDate(e);
    if (e.from != undefined && e.to != undefined) {
      setfilters({
        ...filters,
        start_date: format(e.from, "yyy-LL-dd"),
        end_date: format(e.to, "yyy-LL-dd"),
      });
    }else{
      setfilters({
        ...filters,
        start_date: null,
        end_date: null,
      });
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-full h-[55px] mt-2"
          >
            {/* <CalendarIcon className="mr-1" /> */}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyy-LL-dd")} - {format(date.to, "yyy-LL-dd")}
                </>
              ) : (
                format(date.from, "yyy-LL-dd")
              )
            ) : (
              <span className="text-ring">Buscar en rango</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={(e) => {
              dateHandle(e);
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
