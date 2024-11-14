import { AppLayout } from "@/app/layouts/appLayout/AppLayout";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { dataPerEjemplo } from "./dataper";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
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
import { HeaderDataTable } from "@/components/DataTable/HeaderDataTable";
import { DataTable } from "@/components/DataTable/DataTable";
import { AddPersonalForm } from "./components/AddPersonalForm";
import {
  getContryState,
  getCountry,
  getMunicipality,
  getParishes,
} from "@/features/personal/expediente/tablasBasicas/datosPersonales/DatosPerThunk";

const columns = [
  {
    header: "ID",
    accessorKey: "id",
    classname: "text-center",
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
    meta: {
      filterVariant: "range",
    },
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
    accessorKey: "nombre1",
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
    classname: "text-center ",
    meta: {
      filterVariant: "select",
      options: [
        { key: "01", value: "01" },
        { key: "02", value: "02" },
        { key: "03", value: "03" },
        { key: "04", value: "04" },
        { key: "05", value: "05" },
      ],
    },
    cell: (info) => (
      <div className="text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline">{info.getValue().codigo}</Badge>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px]">
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
    meta: {
      filterVariant: "dateRange",
    },
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
    meta: {
      filterVariant: "select",
      options: [
        { key: "Masculino", value: "male" },
        { key: "Femenino", value: "female" },
      ],
    },
  },
  {
    header: "ESTADO CIVIL",
    classname: "text-center",
    accessorKey: "estado_civil",
    meta: {
      filterVariant: "select",
      options: [
        { key: "Casado", value: "casado" },
        { key: "Divorciado", value: "divorciado" },
        { key: "Soltero", value: "soltero" },
        { key: "Viudo", value: "viudo" },
      ],
    },
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  },
  {
    header: "PESO",
    accessorKey: "peso",
    classname: "text-center",
    meta: {
      filterVariant: "range",
    },
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  },
  {
    header: "ALTURA",
    accessorKey: "altura",
    classname: "text-center",
    meta: {
      filterVariant: "range",
    },
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  },
  {
    header: "SANGRE",
    accessorKey: "sangre",
    classname: "text-center",
    meta: {
      filterVariant: "select",
      options: [
        { key: "A+", value: "A+" },
        { key: "A-", value: "A-" },
        { key: "AB+", value: "AB-" },
        { key: "B+", value: "B-" },
        { key: "O+", value: "O-" },
      ],
    },
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
    meta: {
      filterVariant: "select",
      options: [
        { key: "A+", value: "A+" },
        { key: "A-", value: "A-" },
        { key: "AB+", value: "AB-" },
        { key: "B+", value: "B-" },
        { key: "O+", value: "O-" },
      ],
    },
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
    header: "DOCUMENTO",
    accessorKey: "documento",
  },
  {
    id: "acciones",
    header: "ACCIONES",
    enableSorting: false,
    accessorKey: "acciones",
    classname: "text-center",
    enableFiltering: false,
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
              <DropdownMenuItem onClick={() => {}}>Detalles</DropdownMenuItem>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const data = {
  documento: "V",
  cedula: "",
  email1: "",
  email2: "",
  nombre1: "",
  nombre2: "",
  apellido1: "",
  apellido2: "",
  pais: {
    id: 1,
    nombre: "Venezuela",
  },
  estado: {},
  municipio: {},
  parroquia: {},
  direccion: "",
  telefono1: "",
  telefono2: "",
  fecha_nacimiento: "",
  sexo: "",
  estado_civil: "S",
  peso: "",
  altura: "",
};

export const DatosPersonalesPage = () => {
  const { layout, filters } = useSelector((state) => state.ui);
  const [filtersTable, setFiltersTable] = useState({
    columnVisibility: {
      id: false,
      cedula: true,
      rif: false,
      nombre: true,
      sexo: true,
      estado_civil: false,
      documento: false,
      peso: false,
      telefono: true,
      altura: false,
      sangre: false,
      direccion: true,
      email1: false,
      lugar_nacimiento: false,
      tipo_personal: true,
      fecha_nacimiento: false,
      area: false,
      uniforme: false,
      enfermedades: false,
      acciones: true,
    },
    filters: [],
    sorting: [],
    columnFilters: [],
    view: 10,
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  });

  const [addButton, setaddButton] = useState({
    status: false,
    textButton: "Agregar personal",
    title: "Personal",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getContryState());
    dispatch(getMunicipality());
    dispatch(getParishes());
  }, []);

  return (
    <AppLayout
      title={addButton.title}
      titleButton={addButton.textButton}
      functionButton={() =>
        setaddButton({
          status: !addButton.status,
          textButton: addButton.status ? "Agregar personal" : "Volver atras",
          title: addButton.status ? "Personal" : "Agregar personal",
        })
      }
    >
      {addButton.status ? (
        <div id="addPersonal" className="p-2">
          <AddPersonalForm data={data} />
        </div>
      ) : (
        <span>qweqw</span>
        // <div id="personalTable">
        //   <HeaderDataTable
        //     placeholder={"personal"}
        //     filtersTable={filtersTable}
        //     setFiltersTable={setFiltersTable}
        //   />
        //   {dataPerEjemplo != undefined ? (
        //     layout == "grid" ? (
        //       "grid"
        //     ) : (
        //       <DataTable
        //         columns={columns}
        //         data={dataPerEjemplo}
        //         filtersTable={filtersTable}
        //         setFiltersTable={setFiltersTable}
        //       />
        //     )
        //   ) : layout == "grid" ? (
        //     <SkeletonGrid />
        //   ) : (
        //     <SkeletonList />
        //   )}
        // </div>
      )}
    </AppLayout>
  );
};
