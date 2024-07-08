import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GridLogs = ({ item }) => {
  return (
    <Card className="flex items-center justify-center flex-col">
      <div>
        <CardHeader className="text-center">
          <CardTitle className="text-md">
            <div className="flex flex-col">
              <span>C.I: {item.user.document_id}</span>
              <span className="text-[11px] uppercase font-normal">
                Nombre:{" "}
                <span className="text-primary text-[15px]">
                  {item.user.name}
                </span>
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="line-clamp-2 mb-4 leading-normal text-sm text-muted-foreground w-full">
              {item.details}
            </TooltipTrigger>
            <TooltipContent className="max-w-[500px] leading-normal">
              <p>{item.details}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardFooter className="flex justify-center gap-2">
          <Badge variant="outline">
            {format(item.created_at, "dd MM, y - p")}
          </Badge>
          {/* <Badge  variant="outline" className="truncate max-w-24">
            {item.action}
          </Badge> */}
        </CardFooter>
      </div>
    </Card>
  );
};
