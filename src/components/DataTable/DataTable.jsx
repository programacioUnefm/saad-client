import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowLeftRight,
  ArrowUpNarrowWide,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  SearchX,
} from "lucide-react";
import { FiltersDataTable } from "./FiltersDataTable";

export const DataTable = ({ data, columns, filtersTable, setFiltersTable }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: filtersTable.sorting,
      columnVisibility: filtersTable.columnVisibility,
      columnFilters: filtersTable.columnFilters,
      pagination: filtersTable.pagination,
    },
  });

  const sortingHandle = (e) => {
    if (filtersTable.sorting.length == 0) {
      setFiltersTable((prevState) => ({
        ...prevState,
        sorting: [{ id: e.id, desc: true }],
      }));
    } else {
      if (filtersTable.sorting[0].desc) {
        setFiltersTable((prevState) => ({
          ...prevState,
          sorting: [{ id: e.id, desc: false }],
        }));
      } else {
        if (filtersTable.sorting[0].id === e.id) {
          setFiltersTable((prevState) => ({
            ...prevState,
            sorting: [],
          }));
        } else {
          setFiltersTable((prevState) => ({
            ...prevState,
            sorting: [{ id: e.id, desc: true }],
          }));
        }
      }
    }
  };

  const paginationHandle = (event) => {
    let newPaginationState = { ...filtersTable.pagination };
    switch (event) {
      case "next":
        newPaginationState.pageIndex = newPaginationState.pageIndex + 1;
        break;
      case "previous":
        newPaginationState.pageIndex = newPaginationState.pageIndex - 1;
        break;
      case "last":
        newPaginationState.pageIndex = table.getPageCount() - 1;
        break;
      case "first":
        newPaginationState.pageIndex = 0;
        break;
    }
    setFiltersTable((prevState) => ({
      ...prevState,
      pagination: newPaginationState,
    }));
  };

  return (
    <div className="pb-12">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={header.column.columnDef.classname}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="">
                        {header.column.getIsSorted() != null && (
                          <div className="relative py-2">
                            {header.column.getCanSort() ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className=" h-8"
                                onClick={() => sortingHandle(header.column)}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {
                                  {
                                    asc: (
                                      <ArrowUpNarrowWide className="ml-2 w-4" />
                                    ),
                                    desc: (
                                      <ArrowDownNarrowWide className="ml-2 w-4" />
                                    ),
                                  }[header.column.getIsSorted() ?? null]
                                }
                                {!header.column.getIsSorted() && (
                                  <ArrowLeftRight className="ml-2 w-3 rotate-90" />
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="link"
                                className="p-0 h-8 text-ring/70"
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </Button>
                            )}
                            <br />
                            <FiltersDataTable
                              header={header}
                              filtersTable={filtersTable}
                              setFiltersTable={setFiltersTable}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-[65vh]">
                <div className="flex justify-center items-center flex-col w-full text-center">
                  <SearchX className="mb-4 text-ring " size={50} />
                  <span className="text-xl font-bold uppercase text-ring">
                    No hay resultados
                  </span>
                  <p className="mt-4">Lo que estás intentando buscar no existe<br /> o no tienes privilegios para verlo.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > filtersTable.view && (
        <div className="absolute w-full -bottom-4 bg-background">
          <div className="flex items-center justify-end space-x-2 py-4 pr-8">
            <div className="flex-1 text-sm text-muted-foreground">
              pagina {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()} -
              <span className="ml-1 font-bold text-ring">
                items total {table.getFilteredRowModel().rows.length}
              </span>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginationHandle("first")}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronFirst className="w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginationHandle("previous")}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginationHandle("next")}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginationHandle("last")}
                disabled={!table.getCanNextPage()}
              >
                <ChevronLast className="w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
