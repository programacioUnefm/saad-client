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

export const GridUsers = ({ user, setAction }) => {
  
  return (
    <>
    <Card>
      <CardHeader className="text-center">
        <h2 className="font-bold">C.I: {user.document_id}</h2>
        <span className="text-sm text-primary truncate">{user.email}</span>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-1 md:text-center lg:grid-cols-2 lg:text-left">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm truncate">{user.name}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{`${user.name} ${user.last_name}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-end gap-1">
            {user.roles.slice(0, 2).map((role, index) => (
              <TooltipProvider key={role.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className="text-sm bg-slate-700 px-1 rounded-md whitespace-nowrap truncate text-white"
                      style={{ fontSize: "10px", height: "20px" }}
                    >
                      {role.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{role.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {user.roles.length > 2 && (
              <Popover>
                <PopoverTrigger className="-mt-1">
                  <span
                    className="text-sm bg-slate-700 py-1 px-1 rounded-md whitespace-nowrap text-white"
                    style={{ fontSize: "10px" }}
                  >
                    Más
                  </span>
                </PopoverTrigger>
                <PopoverContent>
                  {user.roles.map((role) => (
                    <span
                      key={Math.random()}
                      className="text-sm bg-slate-700 p-1 rounded-md mx-1 text-white"
                      style={{ fontSize: "10px" }}
                    >
                      {role.name}
                    </span>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-2">
        <Button disabled={user.id == 1} className="bg-accent hover:bg-accent/50" onClick={() => setAction({dialog:true, action:"edit", user:user})}>Editar</Button>
        <Button disabled={user.id == 1} className="bg-accent hover:bg-accent/50" onClick={() => setAction({dialog:true, action:"role", user:user})}>Roles</Button>
        <Button disabled={user.id == 1} className="bg-destructive hover:bg-destructive/50" onClick={() => setAction({dialog:true, action:"delete", user:user})}>Eliminar</Button>
      </CardFooter>
    </Card>
    </>
  );
};
