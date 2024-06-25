import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

import { Chip } from "@/components/ui/chip";
import { ButtonsActions } from "../components/tabs/components/ButtonsActions";

export const GridRoles = ({ rol, setAction, tabState }) => {
  return (
    <Card className="bg-background dark:bg-muted/20">
      <CardHeader className="text-center">
        <h2 className="font-bold uppercase truncate">{rol.name}</h2>
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
                    {!!rol.description ? rol.description : "N/E"}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[300px] text-sm">{rol.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-col items-end">
            <span className="uppercase font-bold" style={{ fontSize: "10px" }}>
              Código
            </span>
            <Chip text={rol.code} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <ButtonsActions
          setAction={setAction}
          arrayItem={rol}
          tabState={tabState}
        />
      </CardFooter>
    </Card>
  );
};
