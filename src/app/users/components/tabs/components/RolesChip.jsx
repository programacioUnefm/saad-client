import { Chip } from "@/components/ui/chip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const RolesChip = ({ user }) => {
  return (
    <div className="flex gap-1">
      {user.roles.slice(0, 2).map((rol) => (
        <Chip text={rol.name} key={Math.random()} />
      ))}

      {user.roles.length > 2 && (
        <Popover>
          <PopoverTrigger>
            <span className="text-primary">Ver...</span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-row max-w-50 flex-wrap gap-1">
            {user.roles.map((rol) => (
              <span
                className="bg-accent p-1 rounded-md whitespace-nowrap truncate"
                key={Math.random()}
              >
                {rol.name}
              </span>
            ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
