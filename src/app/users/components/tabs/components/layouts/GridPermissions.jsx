import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { TooltipContent } from "@/components/ui/tooltip";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";
import { ButtonsActions } from "../ButtonsActions";

export const GridPermissions = ({ permission, setAction, tabState }) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <h2 className="font-bold uppercase truncate">{permission.name}</h2>
        <div className="flex flex-col">
          <span className="uppercase font-bold " style={{ fontSize: "10px" }}>
            Padre
          </span>
          <span className="text-primary">
            {!!permission.parent_id? permission.parent_id : "N/A"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col">
                  <span
                    className="uppercase font-bold "
                    style={{ fontSize: "10px" }}
                  >
                    descripción
                  </span>
                  <span className="truncate text-foreground/70">
                    {!!permission.description ? permission.description : "N/E"}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[300px] text-sm">
                  {permission.description}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-col items-end">
            <span className="uppercase font-bold" style={{ fontSize: "10px" }}>
              Código
            </span>
            <Chip text={permission.code} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <ButtonsActions setAction={setAction} arrayItem={permission} tabState={tabState}/>
      </CardFooter>
    </Card>
  );
};
