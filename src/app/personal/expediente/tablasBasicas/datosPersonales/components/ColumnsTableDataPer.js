import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { MoreHorizontal } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";

export const columnsDataPer = [
    {
      header: "ID",
      accessorKey: "id",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "DOCUMENTO",
      accessorKey: "documento",
    },
    {
      header: "CEDULA",
      accessorKey: "cedula",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center font-bold">{info.getValue()}</div>
      ),
    },
    {
      header: "RIF",
      accessorKey: "rif",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "NOMBRE",
      enableSorting: false,
      accessorKey: "nombre",
      cell: (info) => (
        <div className="">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="whitespace-nowrap truncate">{`${info.row.original.nombre1} ${info.row.original.apellido1}`}</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-[500px]">
                {`${info.row.original.nombre1} ${info.row.original.nombre2} ${info.row.original.apellido1} ${info.row.original.apellido2}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      header: "PERSONAL",
      accessorKey: "tipo_personal",
      classname: "text-center max-w-[100px]",
      cell: (info) => (
        <div className="text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline">{info.getValue().codigo}</Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-[500px]">
                <h2 className="font-semibold mb-2 text-xl">
                  {info.getValue().personal}
                </h2>
                <p>{info.getValue().descripcion}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      header: "NACIMIENTO",
      classname: "text-center",
      accessorKey: "fecha_nacimiento",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "DIRECCION",
      enableSorting: false,
      accessorKey: "direccion",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="max-w-[100px] overflow-hidden line-clamp-2"
                >
                  {info.getValue()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-[500px]">
                <p>{info.getValue()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      header: "EMAIL",
      accessorKey: "email1",
      cell: (info) => (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="max-w-[100px] overflow-hidden line-clamp-2"
                >
                  {info.getValue()}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-[500px]">
                <p>{info.getValue()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      header: "TELEFONO",
      classname: "text-center",
      accessorKey: "telefono",
      cell: (info) => (
        <div className="text-center flex flex-col -mt-2 -mb-2 gap-1">
          <span>{info.row.original.telefono1}</span>
          <span>{info.row.original.telefono2}</span>
        </div>
      ),
    },
    {
      header: "SEXO",
      accessorKey: "sexo",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "ESTADO CIVIL",
      accessorKey: "estado_civil",
    },
    {
      header: "PESO",
      accessorKey: "peso",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "ALTURA",
      accessorKey: "altura",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "SANGRE",
      accessorKey: "sangre",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      header: "LUGAR NACIMIENTO",
      enableSorting: false,
      accessorKey: "lugar_nacimiento",
      cell: (info) => <div className="text-center">{info.getValue().estado}</div>,
    },
    {
      header: "AREA",
      enableSorting: false,
      accessorKey: "area",
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue().area}</div>,
    },
    {
      header: "UNIFORME",
      enableSorting: false,
      accessorKey: "uniforme",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center">
          <Button variant="link" size="sm" className="uppercase">
            Ver tallas
          </Button>
        </div>
      ),
    },
    {
      header: "ENFERMEDADES",
      enableSorting: false,
      accessorKey: "enfermedades",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center">
          <Button variant="link" size="sm" className="uppercase">
            ver listar
          </Button>
        </div>
      ),
    },
    {
      id: "acciones",
      header: "ACCIONES",
      enableSorting: false,
      classname: "text-center",
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>ACCIONES</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => {}}>
                  Ver más detalles
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];