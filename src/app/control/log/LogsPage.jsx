import { AppLayout } from "@/app/layouts/appLayout/AppLayout";
import { getLogsList, paginateLogs } from "@/features/control/logs/LogsThunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderLogs } from "./components/HeaderLogs";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
import { GridLogs } from "./layouts/GridLogs";
import { ButtonPagination } from "@/components/ButtonPagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ListLogs } from "./layouts/ListLogs";

export const LogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogsList());
  }, []);
  const { list } = useSelector((state) => state.logs);
  const { layout } = useSelector((state) => state.ui);

  const paginationHandle = () => {
    dispatch(paginateLogs(list.next_page_url));
  };
  return (
    <AppLayout title={"Bitacora de sistema"}>
      <HeaderLogs />
      {list.data != undefined ? (
        layout == "list" ? (
          
            <Table className="dark:bg-accent/20 bg-white mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Cédula</TableHead>
                  <TableHead className="w-[150px]">Nombre</TableHead>
                  <TableHead className="text-center">Detalle</TableHead>
                  <TableHead className="text-center">Acción</TableHead>
                  <TableHead className="text-center">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.data.map((item) => (
                  <ListLogs item={item} key={item.id}/>
                ))}
              </TableBody>
            </Table>
          
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {list.data.map((item) => (
              <GridLogs key={item.id} item={item} />
            ))}
          </div>
        )
      ) : layout == "list" ? (
        <SkeletonList />
      ) : (
        <SkeletonGrid />
      )}
      <ButtonPagination
        placeholder="registros"
        filters={false}
        data={list}
        action={paginationHandle}
      />
    </AppLayout>
  );
};
