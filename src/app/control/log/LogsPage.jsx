import { AppLayout } from "@/app/layouts/appLayout/AppLayout";
import { DataTable } from "@/components/DataTable/DataTable";
import { getLogsList } from "@/features/control/logs/LogsThunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistance, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

export const LogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogsList());
  }, []);
  const { logs } = useSelector((state) => state.logs);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      classname: "text-center w-[100px]",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      meta: {
        filterVariant: "range",
      },
    },
    {
      id: "usuario",
      header: "USUARIO",
      accessorKey: "username",
      classname: "text-center",
      cell: (info) => (
        <div className="text-center font-bold uppercase">{info.getValue()}</div>
      ),
    },
    {
      id: "id usuario",
      header: "ID USUARIO",
      accessorKey: "user_id",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    },
    {
      id: "modulo",
      header: "MODULO",
      accessorKey: "modulo",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => (
        <Badge className="bg-accent text-center text-foreground hover:text-white text-[10px] uppercase">{info.getValue()}</Badge>
      ),
    },
    {
      id: "ip",
      header: "IP",
      enableSorting: false,
      accessorKey: "ip_address",
      classname: "text-center w-5",
      cell: (info) => (
        <Badge className="bg-accent  text-foreground hover:text-white text-[10px] uppercase">{info.getValue()}</Badge>
      ),
    },

    {
      header: "ACCIÓN",
      accessorKey: "action",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => (<div className="text-center"><Badge className="dark:bg-foreground text-accent text-center">{info.getValue()}</Badge></div>),
    },

    {
      id: "detalles",
      header: "DETALLES",
      accessorKey: "details",
      enableSorting: false,
      classname: "text-center",
      cell: (info) => (
        // <p className="text-[13px] line-clamp-1">{info.getValue()}</p>
        <div className="tooltip">
          <Badge className="line-clamp-1 text-center" variant={"outline"}>
          {info.getValue()}
          </Badge>
          <span className="tooltiptext">
          {info.getValue()}
          </span>
        </div>
      ),
    },

    {
      id: "fecha",
      header: "FECHA",
      accessorKey: "created_at",
      classname: "text-center",
      cell: (info) => (
        <div className="tooltip">
          <Badge className="max-w-[120px] min-w-[50px] line-clamp-1 text-center" variant={"outline"}>
            {formatDistance(subDays(new Date(), 0), info.getValue(), {
              addSuffix: true,
              locale: es,
            })}
          </Badge>
          <span className="tooltiptext">
            {formatDistance(subDays(new Date(), 0), info.getValue(), {
              addSuffix: true,
              locale: es,
            })}
          </span>
        </div>
      ),
    },
  ];

  const [filtersTable, setFiltersTable] = useState({
    columnVisibility: {
      id: false,
      usuario: true,
      "id usuario": false,
      modulo: true,
      ip: true,
      acción: true,
      detalles: true,
      fecha: true,
    },
    filters: "",
    sorting: [],
    columnFilters: [],
    view: 20,
    pagination: {
      pageIndex: 0,
      pageSize: 20,
    },
  });

  return (
    <AppLayout title={"Bitacora de sistema"}>
      <DataTable
        columns={columns}
        data={logs}
        filtersTable={filtersTable}
        setFiltersTable={setFiltersTable}
      />
    </AppLayout>
  );
};
