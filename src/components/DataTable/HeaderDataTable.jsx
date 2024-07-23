import { InputSearch } from "@/components/search/InputSearch";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlignJustify,
  List,
  Pin,
  Settings2,
  SlidersHorizontal,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const HeaderDataTable = ({
  placeholde,
  filtersTable,
  setFiltersTable,
}) => {
  const handleCheckboxChange = (key) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      columnVisibility: {
        ...prevState.columnVisibility,
        [key]: !prevState.columnVisibility[key],
      },
    }));
  };

  const onFiltersChange = (item) => {
    if (filtersTable.filters.includes(item)) {
      const element = filtersTable.filters.filter(
        (deleteItem) => deleteItem !== item
      );
      setFiltersTable((prevState) => ({
        ...prevState,
        filters: [...element],
      }));
    } else {
      setFiltersTable((prevState) => ({
        ...prevState,
        filters: [...prevState.filters, item],
      }));
    }
  };

  const paginationSize = (e) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        pageSize: e
      },
    }));
  };

  const fixedColumn = "sticky z-50 top-0 bg-background";

  return (
    <div
      className={
        filtersTable.filters.includes("fixedColumn")
          ? `grid grid-cols-3 p-1 mb-2 ${fixedColumn}`
          : "grid grid-cols-3 p-1 mb-2"
      }
    >
      <div className="col-span-2">
        <div className="flex justify-center items-center gap-2">
          <Input style={{ height: "40px" }} placeholder="buscador global..." />
          <ToggleGroup
            type="multiple"
            className="flex gap-2"
            value={filtersTable.filters}
          >
            <ToggleGroupItem
              variant="outline"
              value="fixedColumn"
              className="whitespace-nowrap"
              onClick={() => onFiltersChange("fixedColumn")}
            >
              {/* <Pin className="w-4 mr-1" /> */}
              FIJAR BARRA
            </ToggleGroupItem>

            <ToggleGroupItem
              variant="outline"
              value="filters"
              onClick={() => onFiltersChange("filters")}
            >
              {/* <SlidersHorizontal className="w-4 mr-1" />  */}
              FILTROS
            </ToggleGroupItem>
          </ToggleGroup>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="" className="h-[40px]">
                <Settings2 className="w-4 mr-1" /> Vista
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px]">
              <ScrollArea className="h-[200px]">
                <div className="flex flex-col gap-2">
                  {Object.entries(filtersTable.columnVisibility).map(
                    ([key, value]) => (
                      <div className="flex items-center space-x-2" key={key}>
                        <Checkbox
                          checked={value}
                          id={key}
                          onClick={() => handleCheckboxChange(key)}
                        />
                        <Label htmlFor={key} className="capitalize text-ring">
                          {key.replace(/_/g, " ")}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="" className="h-[40px]">
              <List className="w-4 mr-1" />
              Mostrar {filtersTable.pagination.pageSize}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32">
            <ToggleGroup
              type="single"
              className="flex flex-col"
              value={filtersTable.pagination.pageSize}
              onValueChange={(e) => paginationSize(e)}
            >
              <ToggleGroupItem variant="outline" value={10} className="w-full">
                10
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value={40} className="w-full">
                40
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value={80} className="w-full">
                80
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value={100} className="w-full">
                100
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value={200} className="w-full">
                200
              </ToggleGroupItem>
              <ToggleGroupItem variant="outline" value={300} className="w-full">
                300
              </ToggleGroupItem>
            </ToggleGroup>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
