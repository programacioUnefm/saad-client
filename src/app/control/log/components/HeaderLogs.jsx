import { LayoutData } from "@/components/LayoutData";
import { InputSearch } from "@/components/search/InputSearch";
import React from "react";
import { RageDate } from "./RageDate";

export const HeaderLogs = () => {
  return (
    <div className="grid grid-cols-2 p-1">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <InputSearch route="" placeholder="en bitacora" />
        </div>
        <div>
          <RageDate />
        </div>
      </div>
      <div className="flex justify-end items-center">
        <LayoutData />
      </div>
    </div>
  );
};
