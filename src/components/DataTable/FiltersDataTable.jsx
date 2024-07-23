import React from "react";
import { Input } from "../ui/input";
import { DateRange } from "./DateRange";
import { SelectDateTable } from "./SelectDateTable";

export const FiltersDataTable = ({ header, filtersTable, setFiltersTable }) => {
  return (
    <>
      {filtersTable.filters.includes("filters") && (
        <div className="filters">
          {header.column.columnDef.enableFiltering != false && (
            <>
              {header.column.columnDef.meta == undefined ? (
                <Input
                  placeholder={`Buscar ${header.column.columnDef.header.toLowerCase()}...`}
                  style={{ height: "35px" }}
                />
              ) : header.column.columnDef.meta.filterVariant == "select" ? (
                <SelectDateTable
                  header={header}
                  filtersTable={filtersTable}
                  setFiltersTable={setFiltersTable}
                />
              ) : header.column.columnDef.meta.filterVariant == "range" ? (
                <div className="flex">
                  <Input
                    placeholder="min"
                    type="number"
                    className="rounded-none rounded-tl-md rounded-bl-md "
                    style={{ height: "35px" }}
                  />
                  <Input
                    placeholder="max"
                    type="number"
                    className="rounded-none rounded-tr-md rounded-br-md "
                    style={{ height: "35px" }}
                  />
                </div>
              ) : (
                <DateRange />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
