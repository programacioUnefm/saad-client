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
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ButtonsActions } from "./ButtonsActions";
import { RolesChip } from "./RolesChip";

export const GridUsers = ({ user, setAction }) => {
  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <h2 className="font-bold">C.I: {user.document_id}</h2>
          <span className="text-sm text-primary truncate">{user.email}</span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-1 md:text-center items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm truncate md:mb-3">{user.name}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{`${user.name} ${user.last_name}`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex justify-end md:justify-center mt-0 md:mt-3 lg:mt-0 gap-1">
              <RolesChip user={user}/>
            </div>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-3 gap-2">
          <ButtonsActions setAction={setAction} user={user} />
        </CardFooter>
      </Card>
    </>
  );
};
