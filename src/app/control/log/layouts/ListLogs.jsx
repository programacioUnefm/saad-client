import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ListLogs = ({ item }) => {
  return (
    <TableRow key={Math.random()}>
      <TableCell className="font-medium text-nowrap">{item.user.document_id}</TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="line-clamp-2 text-primary">{item.user.name}</span>
            </TooltipTrigger>
            <TooltipContent>
            {item.user.name}  { item.user.last_name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="line-clamp-2 text-muted-foreground">
                {item.details}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[500px]">{item.details}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="text-center truncate max-w-[150px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="line-clamp-2 text-ring">{item.action}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[500px]">{item.action}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="text-right">
        <Badge variant="outline" className="text-nowrap">
          {format(item.created_at, "dd MM, y - p")}
        </Badge>
      </TableCell>
    </TableRow>
  );
};
