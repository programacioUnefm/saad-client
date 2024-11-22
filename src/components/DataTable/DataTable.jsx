import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowLeftRight,
  ArrowUpNarrowWide,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  FileText,
  SearchX,
  Sheet,
  Wrench,
} from "lucide-react";
import { FiltersDataTable } from "./FiltersDataTable";
import { Input } from "../ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";

export const DataTable = ({ data, columns, filtersTable, setFiltersTable }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: filtersTable.sorting,
      columnVisibility: filtersTable.columnVisibility,
      columnFilters: filtersTable.columnFilters,
      pagination: filtersTable.pagination,
      globalFilter: filtersTable.filters,
    },
  });

  //funcion para organizar los items de forma ascendentes o descendentes
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
  //funcion para visualizar items en la tabla escoge cuales se quieren ver y cuales no con un switch
  const handleViewItems = (key) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      columnVisibility: {
        ...prevState.columnVisibility,
        [key]: !prevState.columnVisibility[key],
      },
    }));
  };

  //funcion para cambiar la cantidad de items por tabla
  const changeViewTo = (itemsPerview) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      view: itemsPerview,
      pagination: {
        pageIndex: 0,
        pageSize: itemsPerview,
      },
    }));
  };
  //funcion para cambiar el input de busqueda general
  const changeFilter = (input) => {
    setFiltersTable((prevState) => ({
      ...prevState,
      filters: input.target.value,
    }));
  };

  const {siebarState} = useSelector((state) => state.ui)

  

  const scrollArea = `w-[83vw] sm:w-[83vw]  xl:w-full 2xl:w-full rounded-md border bg-accent/10`
  
  return (
    <div>
      <section className="filters px-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="Buscador general"
              value={filtersTable.filters}
              onChange={(e) => {
                changeFilter(e);
              }}
            />
          </div>
          <div className="flex justify-end items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Wrench />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Configuraciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Elegir qué mostrar
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <ScrollArea className="h-[200px] pr-2">
                          <div className="flex flex-col gap-2 py-4 px-2">
                            {Object.entries(filtersTable.columnVisibility).map(
                              ([key, value]) => (
                                <div key={key}>
                                  <div className="w-full uppercase flex items-center place-content-between pb-2">
                                    <Label
                                      className="text-[11px]"
                                      htmlFor={key}
                                    >
                                      {key}
                                    </Label>
                                    <Switch
                                      id={key}
                                      className="ml-8"
                                      size="sm"
                                      checked={value}
                                      onCheckedChange={() =>
                                        handleViewItems(key)
                                      }
                                    />
                                  </div>
                                  <hr />
                                </div>
                              )
                            )}
                          </div>
                        </ScrollArea>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Cantidad de items
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => changeViewTo(10)}>
                          10
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeViewTo(20)}>
                          20
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeViewTo(50)}>
                          50
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeViewTo(100)}>
                          100
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeViewTo(200)}>
                          200
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeViewTo(500)}>
                          500
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Personalizar</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Exportar Excel
                  <DropdownMenuShortcut>
                    <Sheet size={20} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Exportar PDF
                  <DropdownMenuShortcut>
                    <FileText size={20} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      <div className="mb-12 mt-4">
        <ScrollArea className={`${scrollArea} ${siebarState == true? "lg:w-[68vw] md:w-[66vw]" :"lg:w-[83vw] md:w-[79vw]"}`}>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
                      <p className="mt-4">
                        Lo que estás intentando buscar no existe
                        <br /> o no tienes privilegios para verlo.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" className="mb-2" />
        </ScrollArea>
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
    </div>
  );
};
