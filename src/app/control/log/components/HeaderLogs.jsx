import { LayoutData } from "@/components/LayoutData";
import React, { useEffect, useState } from "react";
import { RageDate } from "./RageDate";
import { SearchWithReturn } from "@/components/search/SearchWithReturn";
import { useDispatch } from "react-redux";
import { filtersLogs } from "@/features/control/logs/LogsThunks";

export const HeaderLogs = () => {
  const [filters, setfilters] = useState({
    term: null,
    start_date: null,
    end_date: null,
  });
  const dispatch = useDispatch();
  const onSearchHandled = (e) => {
    setfilters({...filters, term: e});
  };

  const onreset = (e) => {
    setfilters({...filters, term: null})
  };

  useEffect(() => {
    dispatch(filtersLogs(filters))
  }, [filters])
  
  return (
    
    <div className="grid grid-cols-3 p-1">
      <div className="flex gap-2 col-span-2">
        <div className="w-2/3">
          <SearchWithReturn
            placeholder="por nombe, cédula"
            action={(e) => onSearchHandled(e)}
            reset={(e) => onreset(e)}
          />
        </div>
        <div className="w-1/3">
          <RageDate filters={filters} setfilters={setfilters}/>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <LayoutData />
      </div>
    </div>
  );
};
