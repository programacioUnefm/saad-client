import { AppLayout } from "@/app/layouts/appLayout/AppLayout";
import { SearchAndFilters } from "@/components/search/SearchAndFilters";
import { getLogsList } from "@/features/control/logs/LogsThunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderLogs } from "./components/HeaderLogs";
import { SkeletonList } from "@/components/Skeletons/SkeletonList";
import { SkeletonGrid } from "@/components/Skeletons/SkeletonGrid";
import { GridLogs } from "./layouts/GridLogs";



export const LogsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLogsList());
  }, []);
  const { list } = useSelector((state) => state.logs);
  const { layout } = useSelector((state) => state.ui);

  return (
    <AppLayout title={"Bitacora de sistema"}>
      <HeaderLogs />
      {list.data != undefined ? (
        layout == "list" ? (
          <SkeletonList />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4">
              {list.data.map((item) => (
                <GridLogs key={item.id} item={item} />
              ))}
            </div>
          </>
        )
      ) : layout == "list" ? (
        <SkeletonList />
      ) : (
        <SkeletonGrid />
      )}
    </AppLayout>
  );
};
